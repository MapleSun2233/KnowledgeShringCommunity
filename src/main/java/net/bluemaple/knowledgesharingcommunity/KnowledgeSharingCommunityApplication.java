package net.bluemaple.knowledgesharingcommunity;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement
@MapperScan("net.bluemaple.knowledgesharingcommunity.mapper")
public class KnowledgeSharingCommunityApplication {

    public static void main(String[] args) {
        SpringApplication.run(KnowledgeSharingCommunityApplication.class, args);
    }

}
