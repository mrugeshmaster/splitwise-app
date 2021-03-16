-- docker run -d --name mysql -td -p 3306:3306 -e MYSQL_ROOT_PASSWORD=cmpe273 mysql:5.7

CREATE DATABASE IF NOT EXISTS splitwise;
USE `splitwise`;

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
    `user_id` INT(10) NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(15),
    `currency` VARCHAR(3),
    `language` VARCHAR(255),
    `timezone` VARCHAR(255),
    `image` VARCHAR(255),
    PRIMARY KEY (`user_id`),
    UNIQUE KEY `email_UNIQUE` (`email`)
);

DROP TABLE IF EXISTS `groups`;

CREATE TABLE `groups` (
    `group_id` INT(10) NOT NULL AUTO_INCREMENT,
    `group_name` VARCHAR(255) NOT NULL,
    `group_image` VARCHAR(255),
    PRIMARY KEY (`group_id`),
    UNIQUE KEY `group_name_UNIQUE` (`group_name`)
);

DROP TABLE IF EXISTS `groups_users`;

CREATE TABLE `groups_users` (
    `group_user_id` INT(10) NOT NULL AUTO_INCREMENT,
    `group_id` INT(10) NOT NULL,
    `user_id` INT(10) NOT NULL,
    `is_member` VARCHAR(1),
    PRIMARY KEY (`group_user_id`),
    INDEX `group_user_composite` (`group_id`, `user_id`)
);

DROP TABLE IF EXISTS `bills`;

CREATE TABLE `bills` (
    `bill_id` INT(10) NOT NULL AUTO_INCREMENT,
    `group_id` INT(10) NOT NULL,
    `bill_name` VARCHAR NOT NULL,
    `bill_paid_by` INT(10) NOT NULL,
    `bill_amount` INT(10) NOT NULL,
    `bill_created_at` TIMESTAMP NOT NULL,
    `settle` VARCHAR(1),
    PRIMARY KEY (`bill_id`),
    FOREIGN KEY (`group_id`) REFERENCES `groups`(`group_id`),
    FOREIGN KEY (`bill_paid_by`) REFERENCES `users`(`user_id`)
);

DROP TABLE IF EXISTS `bill_transaction`;

CREATE TABLE `bill_transaction` (
    `transaction_id` INT(10) NOT NULL AUTO_INCREMENT,
    `bill_id` INT(10) NOT NULL,
    `user_id` INT(10) NOT NULL,
    `owed_id` INT(10) NOT NULL,
    `amount` DOUBLE NOT NULL,
    PRIMARY KEY (`transaction_id`),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`),
    FOREIGN KEY (`owed_id`) REFERENCES `users`(`user_id`)
);

DROP PROCEDURE IF EXISTS `add_bill`;
DELIMITER //
CREATE PROCEDURE `add_bill` (
    in_group_id INT,
    in_bill_name VARCHAR(255),
    in_bill_paid_by INT,
    in_bill_amount DOUBLE
)
BEGIN
    DECLARE _bill_id INT;

    INSERT INTO bills (group_id, bill_name, bill_paid_by, bill_amount, bill_created_at, settle) 
    VALUES (in_group_id,in_bill_name,in_bill_paid_by,in_bill_amount,NOW(),'F');

    SELECT max(bill_id) INTO _bill_id FROM bills WHERE bill_name = in_bill_name;

    INSERT INTO bill_transaction ( bill_id, user_id, owed_id, amount)
    SELECT b.bill_id,
            b.bill_paid_by AS user_id,
            b1.owed_id AS owed_id,
            (b.bill_amount / b2.no_of_users) AS amount
    FROM bills b 
    JOIN (
        SELECT count(gu.user_id) AS no_of_users, 
                b.group_id, 
                b.bill_id
        FROM bills b 
        JOIN groups_users gu
        ON b.group_id = gu.group_id 
        AND gu.is_member = 'Y'
        GROUP BY b.group_id, b.bill_id
    ) b2 
    ON b.group_id = b2.group_id 
    AND b.bill_id = b2.bill_id
    JOIN
    (
        SELECT user_id AS owed_id, 
                bills.bill_id
        FROM bills 
        JOIN groups_users 
        ON bills.group_id = groups_users.group_id 
        AND bills.bill_paid_by <> groups_users.user_id
        AND groups_users.is_member = 'Y'
    ) b1 
    ON b.bill_id = b1.bill_id
    WHERE b.bill_id = _bill_id;

    SELECT "BILL_ADDED" AS flag;

END //
DELIMITER ;

DROP PROCEDURE IF EXISTS `Login_Get`;
DELIMITER //
CREATE PROCEDURE `Login_Get` (
    in_email  VARCHAR(255)
)
BEGIN
    IF EXISTS(SELECT user_id FROM users WHERE email = in_email) THEN
        SELECT user_id, email, password, name, phone, currency, language, timezone, 1 AS flag FROM users WHERE email = in_email;
    ELSE
        SELECT 0 AS flag;
    END IF;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS `SIGNUP_Post`;
DELIMITER //
CREATE PROCEDURE `SIGNUP_Post` (
    in_name VARCHAR(255),
    in_email VARCHAR(255),
    in_password VARCHAR(255)
)
BEGIN
    IF NOT EXISTS(SELECT email FROM users WHERE email = in_email) THEN
        INSERT INTO users (name, email, password, currency, language, timezone, image) VALUES (in_name, in_email, in_password, 'USD', 'English', '-08:00','userPlaceholder.png');
        SELECT 'NEW_USER_CREATED' AS flag;
    ELSE
        SELECT 'USER_ALREADY_EXISTS' AS flag;
    END IF;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS `Profile_Get`;
DELIMITER //
CREATE PROCEDURE `Profile_Get` (
    in_user_id  INT
)
BEGIN
    -- IF EXISTS(SELECT user_id FROM users WHERE user_id = in_user_id) THEN
    --     SELECT user_id, email, password, name, phone, currency, language, timezone, 1 AS flag FROM users WHERE user_id = user_id;
    -- ELSE
    --     SELECT 0 AS flag;
    -- END IF;
    SELECT user_id, email, password, name, phone, currency, language, timezone, image FROM users WHERE user_id = in_user_id;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS `Profile_Put`;
DELIMITER //
CREATE PROCEDURE `Profile_Put` (
    in_user_id  INT,
    in_name VARCHAR(255),
    in_email VARCHAR(255),
    in_phone VARCHAR(15),
    in_currency VARCHAR(3),
    in_language VARCHAR(255),
    in_timezone VARCHAR(255),
    in_image VARCHAR(255)
)
BEGIN
    DECLARE count_users INT;
    -- IF EXISTS(SELECT user_id FROM users WHERE user_id = in_user_id) THEN
    SELECT COUNT(1) INTO count_users FROM users WHERE user_id = in_user_id;
    IF count_users > 0 THEN
        UPDATE users SET email = in_email, name = in_name, phone = in_phone, currency = in_currency, language = in_language, timezone = in_timezone WHERE user_id = in_user_id;
        SELECT 1 AS flag FROM users;
    ELSE
        SELECT 0 AS flag;
    END IF;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS `Group_Create`;
DELIMITER //
CREATE PROCEDURE `Group_Create` (
    in_user_id INT,
    in_group_name VARCHAR(255),
    in_group_image VARCHAR(255)
)
BEGIN
    DECLARE _group_id INT;
    IF EXISTS(SELECT group_name FROM groups WHERE group_name = TRIM(in_group_name)) THEN
        SELECT 'DUPLICATE_GROUP' AS flag;
    ELSE
        INSERT INTO groups (group_name, group_image) VALUES (in_group_name, in_group_image);
        SELECT group_id INTO _group_id FROM groups WHERE group_name = in_group_name;
        INSERT INTO groups_users (user_id, group_id, is_member) VALUES (in_user_id, _group_id, 'Y');
        SELECT 'GROUP_CREATED' AS flag;
    END IF;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS `Group_Member_Invite`;
DELIMITER //
CREATE PROCEDURE `Group_Member_Invite` (
    in_email VARCHAR(255),
    in_group_name VARCHAR(255)
)
sp: BEGIN
        DECLARE _group_id INT;
        DECLARE _user_id INT;

        IF EXISTS(SELECT user_id FROM users WHERE email = in_email) THEN
            SELECT user_id INTO _user_id FROM users WHERE email = in_email;
        ELSE
            SELECT 'MEMBER_DOES_NOT_EXIST' AS flag;
            LEAVE sp;
        END IF;

        IF EXISTS(SELECT group_name FROM groups WHERE group_name = TRIM(in_group_name)) THEN
                SELECT group_id INTO _group_id FROM groups WHERE group_name = in_group_name;
        ELSE
            SELECT 'GROUP_DOES_NOT_EXIST' AS flag;
            LEAVE sp;
        END IF;
        
        IF EXISTS(SELECT user_id FROM groups_users WHERE user_id = _user_id AND group_id = _group_id) THEN
            SELECT 'MEMBER_ALREADY_INVITED' AS flag;
        ELSE
            INSERT INTO groups_users (user_id, group_id, is_member) VALUES (_user_id, _group_id, 'N');
            SELECT 'MEMBER_INVITED' AS flag;
        END IF;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS `Group_Member_Invite_Display`;
DELIMITER //
CREATE PROCEDURE `Group_Member_Invite_Display` (
    in_user_id INT
)
BEGIN
    
    SELECT group_name 
    FROM groups 
    WHERE group_id IN (
        SELECT group_id 
        FROM groups_users 
        WHERE user_id = in_user_id 
        AND is_member = 'N'
    );
    
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS `Group_Get`;
DELIMITER //
CREATE PROCEDURE `Group_Get` (
    in_user_id INT
)
BEGIN
    
    SELECT group_name 
    FROM groups 
    WHERE group_id IN (
        SELECT group_id 
        FROM groups_users 
        WHERE user_id = in_user_id 
        AND is_member = 'Y'
    );
    
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS `Group_Member_Invite_Accept`;
DELIMITER //
CREATE PROCEDURE `Group_Member_Invite_Accept` (
    in_user_id INT,
    in_group_name VARCHAR(255)
)
BEGIN
    
    UPDATE groups_users SET is_member = 'Y' 
    WHERE user_id = in_user_id 
    AND group_id = (SELECT group_id 
                    FROM groups 
                    WHERE group_name = in_group_name);

    SELECT 'INVITE_ACCEPTED' AS flag;
    
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS `Get_Recent_Activity`
DELIMITER //
CREATE PROCEDURE `Get_Recent_Activity` (
    in_user_id INT
)
BEGIN
    SELECT b.bill_id, 
            b.bill_name,
            b.bill_amount, 
            g.group_name, 
            b.bill_paid_by, 
            gu.user_id,
            u.name,
            CASE 
                WHEN gu.user_id = b.bill_paid_by 
                THEN 'GET' 
                ELSE 'PAY' 
            END AS pay_get, 
            CASE 
                WHEN gu.user_id = b.bill_paid_by 
                THEN (b.bill_amount / gu_count.no_of_users) *  (gu_count.no_of_users - 1)
                ELSE (b.bill_amount / (gu_count.no_of_users))
            END AS split_amount,
            b.bill_created_at
    FROM bills b
    LEFT JOIN groups g ON b.group_id = g.group_id
    LEFT JOIN groups_users gu ON b.group_id = gu.group_id
    LEFT JOIN users u ON gu.user_id = u.user_id 
    LEFT JOIN (
        SELECT count(user_id) AS no_of_users,
                group_id
        FROM groups_users gu
        GROUP BY group_id
    ) gu_count ON b.group_id = gu_count.group_id
    WHERE u.user_id = in_user_id
    ORDER BY b.bill_created_at DESC ;
END //
DELIMITER ;
---------------------------------------------------------------------------------------------
-- to get balances
SELECT s1.collect_amount - s2.owed_amount 
FROM (
    SELECT 
    IFNULL(sum(amount),0) AS collect_amount
    FROM bill_transaction
    WHERE user_id=3 AND owed_id=1
) AS s1 
JOIN (
    SELECT IFNULL(sum(amount),0) AS owed_amount
    FROM bill_transaction
    WHERE user_id=1 AND owed_id=3
) AS s2;

-- to get all users mapping
SELECT DISTINCT gu2.user_id AS owed_id
FROM groups_users gu1 
JOIN groups_users gu2 
ON gu1.user_id <> gu2.user_id AND gu1.group_id = gu2.group_id;

-- to settle
INSERT INTO bill_transaction (bill_id, user_id, owed_id, amount) VALUES (-1, 2, 1, 94.25);

-- get recent activity
SELECT b.bill_id, 
        b.bill_name, 
        b.bill_amount, 
        g.group_name, 
        -- u.user_id,
        b.bill_paid_by, 
        gu.user_id,
        u.name,
        CASE 
            WHEN gu.user_id = b.bill_paid_by 
            THEN 'GET' 
            ELSE 'PAY' 
        END AS pay_get, 
        CASE 
            WHEN gu.user_id = b.bill_paid_by 
            THEN (b.bill_amount / gu_count.no_of_users) *  (gu_count.no_of_users - 1)
            ELSE (b.bill_amount / (gu_count.no_of_users))
        END AS split_amount,
        b.bill_created_at
FROM bills b
LEFT JOIN groups g ON b.group_id = g.group_id
LEFT JOIN groups_users gu ON b.group_id = gu.group_id
LEFT JOIN users u ON gu.user_id = u.user_id 
LEFT JOIN (
    SELECT count(user_id) AS no_of_users,
            group_id
    FROM groups_users gu
    GROUP BY group_id
) gu_count ON b.group_id = gu_count.group_id
WHERE u.user_id = 3
ORDER BY b.bill_created_at DESC ;
---------------------------------------------------------------------------------------------
