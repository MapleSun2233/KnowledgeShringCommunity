create
database ksc default charset=utf8;

use
ksc;


DROP TABLE
    IF EXISTS follower_relationship;
DROP TABLE
    IF EXISTS collection_relationship;
DROP TABLE
    IF EXISTS thumb_relationship;
DROP TABLE
    IF EXISTS article;
DROP TABLE
    IF EXISTS question;
DROP TABLE
    IF EXISTS user;
DROP TABLE
    IF EXISTS role;
DROP TABLE
    IF EXISTS comments;
DROP TABLE
    IF EXISTS answers;
DROP TABLE
    IF EXISTS sub_comments;

CREATE TABLE `role`
(
    `id`        INT PRIMARY KEY,
    `role_type` VARCHAR(255)
) ENGINE = INNODB;

INSERT INTO role (id, role_type)
VALUES (1, 'admin'),
       (2, 'memeber');



CREATE TABLE `user`
(
    `id`           INT          NOT NULL AUTO_INCREMENT,
    `username`     VARCHAR(255) NOT NULL UNIQUE,
    `password`     VARCHAR(255) NOT NULL,
    `nickname`     VARCHAR(255)          DEFAULT NULL,
    `photo`        VARCHAR(255)          DEFAULT 'avatar-default.jpg',
    `contribution` INT                   DEFAULT 0,
    `join_time`    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `role_id`      INT,
    FOREIGN KEY (`role_id`) REFERENCES role (`id`),
    PRIMARY KEY (`id`),
    INDEX (`username`)
) ENGINE = INNODB DEFAULT CHARSET = utf8;



CREATE TABLE `article`
(
    `id`           INT          NOT NULL auto_increment,
    `headline`     VARCHAR(255) NOT NULL,
    `tags`         VARCHAR(255) NOT NULL,
    `post_time`    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `content`      LONGTEXT     NOT NULL,
    `publisher_id` INT,
    `views`        INT                   DEFAULT 0,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`publisher_id`) REFERENCES user (`id`),
    INDEX (`headline`),
    INDEX (`tags`)
) ENGINE = INNODB DEFAULT charset = utf8;


CREATE TABLE `question`
(
    `id`           INT          NOT NULL auto_increment,
    `headline`     VARCHAR(255) NOT NULL,
    `tags`         VARCHAR(255) NOT NULL,
    `post_time`    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `content`      LONGTEXT     NOT NULL,
    `publisher_id` INT,
    `views`        INT                   DEFAULT 0,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`publisher_id`) REFERENCES user (`id`),
    INDEX (`headline`),
    INDEX (`tags`)
) ENGINE = INNODB DEFAULT charset = utf8;

CREATE TABLE `thumb_relationship`
(
    `article_id` INT NOT NULL,
    `user_id`    INT NOT NULL,
    PRIMARY KEY (`article_id`, `user_id`),
    FOREIGN KEY (`article_id`) REFERENCES article (`id`),
    FOREIGN KEY (`user_id`) REFERENCES user (`id`)
) ENGINE = INNODB DEFAULT charset = utf8;



CREATE TABLE `collection_relationship`
(
    `article_id` INT NOT NULL,
    `user_id`    INT NOT NULL,
    PRIMARY KEY (`article_id`, `user_id`),
    FOREIGN KEY (`article_id`) REFERENCES article (`id`),
    FOREIGN KEY (`user_id`) REFERENCES user (`id`)
) ENGINE = INNODB DEFAULT charset = utf8;



CREATE TABLE `follower_relationship`
(
    `follower_id` INT NOT NULL,
    `target_id`   INT NOT NULL,
    PRIMARY KEY (`follower_id`, `target_id`),
    FOREIGN KEY (`follower_id`) REFERENCES user (`id`),
    FOREIGN KEY (`target_id`) REFERENCES user (`id`)
) ENGINE = INNODB DEFAULT charset = utf8;

CREATE TABLE `comments`
(
    `id`         INT       NOT NULL auto_increment,
    `user_id`    INT       NOT NULL,
    `article_id` INT       NOT NULL,
    `content`    LONGTEXT  NOT NULL,
    `post_time`  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES user (`id`),
    FOREIGN KEY (`article_id`) REFERENCES article (`id`),
    INDEX(`article_id`)
) ENGINE = INNODB DEFAULT charset = utf8;


CREATE TABLE `answers`
(
    `id`          INT       NOT NULL auto_increment,
    `user_id`     INT       NOT NULL,
    `question_id` INT       NOT NULL,
    `content`     LONGTEXT  NOT NULL,
    `post_time`   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES user (`id`),
    FOREIGN KEY (`question_id`) REFERENCES question (`id`),
    INDEX(`question_id`)
) ENGINE = INNODB DEFAULT charset = utf8;