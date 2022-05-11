package net.bluemaple.knowledgesharingcommunity.config;

import io.minio.MinioClient;
import net.bluemaple.knowledgesharingcommunity.property.MinIOProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.annotation.Resource;

/**
 * 获取到配置类中提供的访问凭证，创建一个连接到MinIO的实例
 */
@Configuration
@EnableConfigurationProperties(MinIOProperties.class)
public class MinIOConfiguration {

    @Resource
    private MinIOProperties minIOProperties;

    /**
     * 获取MinioClient
     */
    @Bean
    public MinioClient minioClient() {
        return MinioClient.builder()
                .endpoint(minIOProperties.getEndPoint())
                .credentials(minIOProperties.getAccessKey(), minIOProperties.getSecretKey())
                .build();
    }

}
