wpackage com.example.Back_End.Response;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {

    private int Id;
    private String message;
    private boolean status;

}
