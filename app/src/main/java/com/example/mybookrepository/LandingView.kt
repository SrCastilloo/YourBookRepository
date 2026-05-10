package com.example.mybookrepository

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.widthIn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.mybookrepository.ui.theme.MyBookRepositoryTheme

/**
 * Archivo: LandingView.kt
 *
 * Descripción:
 * TODO: Explicar brevemente la responsabilidad de este archivo.
 *
 * Autor: Daniel Castillo
 * Fecha: 10/5/26
 */

@Composable
fun LandingView(modifier: Modifier) {

    val fuenteTitulo = FontFamily(Font(R.font.cormorantgaramonditalicvariable))
    Box(modifier
        .fillMaxSize())
    {
        Image(
            painter = painterResource(id = R.drawable.fondolandingview),
            contentDescription = "Landing Background",
            contentScale = ContentScale.FillBounds,
            modifier = Modifier.fillMaxSize()
        )

        Column(modifier = Modifier.fillMaxSize(),
            verticalArrangement = Arrangement.SpaceEvenly,
            horizontalAlignment = Alignment.CenterHorizontally)
        {
            Row(modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.Center,
                verticalAlignment = Alignment.CenterVertically)
            {
                Image(
                    painter = painterResource(id = R.drawable.bookicon),
                    contentDescription = "Book Icon",
                    modifier = Modifier
                        .height(100.dp)
                        .width(100.dp)
                )
                Text(
                    text = "YourBookRepository",
                    fontSize = 24.sp,
                    fontWeight = FontWeight.Bold,
                    fontFamily = fuenteTitulo,
                    color = Color(255, 255, 255),
                    textAlign = TextAlign.Center
                )

            }

            Text(
                text = "Gestiona tu biblioteca personal",
                modifier = Modifier.
                fillMaxWidth(),
                fontSize = 15.sp,
                fontWeight = FontWeight.SemiBold,
                fontFamily = FontFamily.Serif,
                color = Color(0xFFE8D6B3),
                textAlign = TextAlign.Center
            )




            Text(
                text = "Controla y organiza tus lecturas de forma sencilla y eficiente",
                modifier = Modifier.
                fillMaxWidth()
                    .padding(top = 16.dp),
                fontSize = 15.sp,
                fontWeight = FontWeight.SemiBold,
                fontFamily = FontFamily.Serif,
                color = Color(0xFFE8D6B3),
                textAlign = TextAlign.Center
            )

            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(top = 32.dp)
                    .widthIn(max = 700.dp)
                    .padding(horizontal = 24.dp),
                shape = RoundedCornerShape(24.dp),
                colors = CardDefaults.cardColors(
                    containerColor = Color(0xAA2E2A22)
                ),
                elevation = CardDefaults.cardElevation(defaultElevation = 8.dp)
            ) {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(24.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(
                        text = "Bienvenido/a a YourBookRepository",
                        fontSize = 20.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFFF3E5C8),
                        textAlign = TextAlign.Center
                    )

                    Spacer(modifier = Modifier.height(20.dp))

                    BeneficioItem("Añade libros que estés leyendo o que quieras leer")
                    Spacer(modifier = Modifier.height(12.dp))
                    BeneficioItem("Haz seguimiento a tu progreso y tus reseñas")
                    Spacer(modifier = Modifier.height(12.dp))
                    BeneficioItem("Consulta y organiza tu colección en un solo lugar")

                    Spacer(modifier = Modifier.height(24.dp))

                    Button(
                        onClick = { },
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(56.dp),
                        shape = RoundedCornerShape(16.dp),
                        colors = ButtonDefaults.buttonColors(
                            containerColor = Color(0xFFF0DEB8),
                            contentColor = Color(0xFF3A3125)
                        )
                    ) {
                        Text(
                            text = "Entrar a Mi Biblioteca",
                            fontSize = 22.sp,
                            fontWeight = FontWeight.Bold
                        )
                    }

                }
            }

            Text(
                text = "Desarrollado por Daniel Castillo Cortijo",
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(top = 36.dp, bottom = 16.dp),
                fontSize = 13.sp,
                fontWeight = FontWeight.Medium,
                fontFamily = FontFamily.Serif,
                color = Color(0xCCF1E4CC),
                textAlign = TextAlign.Center
            )



        }

    }


}

@Composable
fun BeneficioItem(texto: String) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text(
            text = "✔",
            fontSize = 22.sp,
            color = Color(0xFFD8C98C),
            modifier = Modifier.padding(end = 12.dp)
        )

        Text(
            text = texto,
            fontSize = 18.sp,
            color = Color(0xFFF3E5C8)
        )
    }
}

@Preview(showBackground = true)
@Composable
fun LandingPreview() {
    MyBookRepositoryTheme {
        LandingView(modifier = Modifier)
    }
}