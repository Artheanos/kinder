package pl.pjatk.kinder;

import io.restassured.http.Header;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringRunner;
import pl.pjatk.kinder.security.model.RegisterRequest;

import static io.restassured.RestAssured.given;
import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@IntegrationTest
public class RegisterTest {

    @BeforeClass
    public static void create_test_users(){

        given().when()
                .header(new Header("Content-Type", "application/json"))
                .body(new RegisterRequest("test@test.test", "Test12345", "Test", "Test"))
                .post("/register").then().statusCode(201);

    }


    @Test
    public void should_successfully_respond_to_registration(){

        var response =
                given().when()
                        .header(new Header("Content-Type", "application/json"))
                        .body(new RegisterRequest("new@user.com", "User12345", "User1", "User1"))
                        .post("/register");

        var statusCode = response.getStatusCode();

        assertThat(statusCode).isEqualTo(201);
    }

    @Test
    public void should_unsuccessfully_respond_to_registration(){

        var response =
                given().when()
                        .header(new Header("Content-Type", "application/json"))
                        .body(new RegisterRequest("test@test.test", "Test12345", "Test", "Test"))
                        .post("/register");

        var statusCode = response.getStatusCode();

        assertThat(statusCode).isEqualTo(400);
    }

}

