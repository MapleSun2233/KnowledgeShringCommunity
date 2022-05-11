package net.bluemaple.knowledgesharingcommunity.util;

import io.minio.ListObjectsArgs;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import io.minio.Result;
import io.minio.errors.*;
import io.minio.messages.Item;
import net.bluemaple.knowledgesharingcommunity.property.MinIOProperties;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * 对MinIO的操作封装，只涉及到存储，因为bucket是public，所以可以直接访问
 */
@Component
public class MinIOUtil {

    @Resource
    private MinIOProperties minIOProperties;
    @Resource
    private MinioClient client;
    /**
     * 上传文件
     */
    public String uploadFile(MultipartFile file) throws Exception {
        //判断文件是否为空
        if (null == file || 0 == file.getSize()) {
            return null;
        }
        String originalFilename = file.getOriginalFilename();
        assert originalFilename != null;
        String fileName = UUID.randomUUID()+originalFilename.substring(originalFilename.lastIndexOf("."));
        //开始上传
        client.putObject(
                PutObjectArgs.builder().bucket(minIOProperties.getBucketName()).object(fileName).stream(
                                file.getInputStream(), file.getSize(), -1)
                        .contentType(file.getContentType())
                        .build());
        return fileName;
    }
    public String uploadFile(MultipartFile file, String prefix) throws Exception {
        //判断文件是否为空
        if (null == file || 0 == file.getSize()) {
            return null;
        }
        String originalFilename = file.getOriginalFilename();
        assert originalFilename != null;
        String fileName = prefix+UUID.randomUUID()+originalFilename.substring(originalFilename.lastIndexOf("."));
        //开始上传
        client.putObject(
                PutObjectArgs.builder().bucket(minIOProperties.getBucketName()).object(fileName).stream(
                                file.getInputStream(), file.getSize(), -1)
                        .contentType(file.getContentType())
                        .build());
        return fileName;
    }
    /**
     * 获取文件列表
     */
    public List<String> fileList() throws ServerException, InsufficientDataException, ErrorResponseException, IOException, NoSuchAlgorithmException, InvalidKeyException, InvalidResponseException, XmlParserException, InternalException {
        Iterable<Result<Item>> results = client.listObjects(ListObjectsArgs.builder().prefix("avatar-").bucket(minIOProperties.getBucketName()).build());
        List<String> files = new ArrayList<>();
        for(Result<Item> r : results){
            files.add(r.get().objectName());
        }
        return files;
    }
}