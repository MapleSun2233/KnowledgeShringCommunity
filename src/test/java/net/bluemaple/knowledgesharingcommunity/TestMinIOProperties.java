package net.bluemaple.knowledgesharingcommunity;

import net.bluemaple.knowledgesharingcommunity.property.MinIOProperties;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class TestMinIOProperties {
    @Test
    public void test(@Autowired MinIOProperties minIOProperties){
        System.out.println(minIOProperties);
    }
}
