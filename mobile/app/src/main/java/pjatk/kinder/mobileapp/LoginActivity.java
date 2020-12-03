package pjatk.kinder.mobileapp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.util.TypedValue;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.RelativeLayout;

public class LoginActivity extends AppCompatActivity {


    private RelativeLayout relLay1, relLay2;
    private ImageView logo;
    private Button forgotPassBtn, signUpBtn;


    //**********LOGO ANIMATION**********
    Handler handler = new Handler();
    Runnable runnable = new Runnable() {
        @Override
        public void run() {
            relLay1.setVisibility(View.VISIBLE);
            relLay2.setVisibility(View.VISIBLE);
            int dimensionInDp = (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, 200, getResources().getDisplayMetrics());
            logo.getLayoutParams().height = dimensionInDp;
            logo.getLayoutParams().width = dimensionInDp;
            logo.requestLayout();
        }
    };
    //***********************************


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        //*****PASSWORD RECOVERY VIEW*****
        forgotPassBtn = findViewById(R.id.forgotPasswordBtn);
        forgotPassBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(LoginActivity.this, PasswordRecoveryActivity.class);
                startActivity(intent);
            }
        });
        //********************************


        //*****REGISTER VIEW*****
        signUpBtn = findViewById(R.id.signUpBtn);
        signUpBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(LoginActivity.this, RegisterActivity.class);
                startActivity(intent);
            }
        });
        //************************


        //*****LOGO ANIMATION*****
        relLay1 = (RelativeLayout) findViewById(R.id.relLay1);
        relLay2 = (RelativeLayout) findViewById(R.id.relLay2);
        logo = (ImageView) findViewById(R.id.imgViewLogo);
        handler.postDelayed(runnable, 2000);
        //************************

    }

}