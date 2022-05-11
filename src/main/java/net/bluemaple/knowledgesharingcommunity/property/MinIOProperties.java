package net.bluemaple.knowledgesharingcommunity.property;
/**
 * MinIO的配置映射
 */

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
@Data
@ConfigurationProperties(prefix  = "minio")
public class MinIOProperties {
    private String endPoint;
    private String accessKey;
    private String secretKey;
    private String bucketName;
}
