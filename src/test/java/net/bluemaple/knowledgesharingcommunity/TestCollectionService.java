package net.bluemaple.knowledgesharingcommunity;

import net.bluemaple.knowledgesharingcommunity.mapper.CollectionRelationshipMapper;
import net.bluemaple.knowledgesharingcommunity.service.CollectionService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class TestCollectionService {
    @Autowired
    private CollectionService service;
    @Test
    public void test(){
        service.addCollection(1,2);
    }
}
