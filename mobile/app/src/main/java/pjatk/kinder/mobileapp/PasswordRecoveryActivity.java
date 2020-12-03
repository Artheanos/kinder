package pjatk.kinder.mobileapp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class PasswordRecoveryActivity extends AppCompatActivity {

    private Button logInBtn, signUpBtn;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_password_recovery);

        //*****LOGIN VIEW*****
        logInBtn = findViewById(R.id.logInBtn);
        logInBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(PasswordRecoveryActivity.this, LoginActivity.class);
                startActivity(intent);
            }
        });
        //********************


        //*****REGISTER VIEW******
        signUpBtn = findViewById(R.id.signUpBtn);
        signUpBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(PasswordRecoveryActivity.this, RegisterActivity.class);
                startActivity(intent);
            }
        });
        //************************
    }
}