#!/usr/bin/perl

use strict;
use warnings;
use feature 'say'; # 'say' es como 'print' pero añade un salto de línea automáticamente

# --- Pedir información al usuario ---

print "¡Hola! ¿Cuál es tu nombre? ";
my $nombre = <STDIN>;
chomp($nombre);

print "Hola, $nombre. ¿Cuántos años tienes? ";
my $edad_str = <STDIN>;
chomp($edad_str);

# Validar que la edad sea un número
unless ($edad_str =~ /^\d+$/) {
    say "¡Eso no parece un número para la edad! Por favor, ejecuta el script de nuevo y introduce una edad válida.";
    exit; # Sale del script si la edad no es un número
}
my $edad = int($edad_str); # Convertir a entero

print "¿En qué año estamos actualmente (por ejemplo, 2025)? ";
my $anio_actual_str = <STDIN>;
chomp($anio_actual_str);

# Validar que el año actual sea un número
unless ($anio_actual_str =~ /^\d{4}$/) { # Verificamos 4 dígitos
    say "¡Eso no parece un año válido (cuatro dígitos)! Por favor, ejecuta el script de nuevo.";
    exit; # Sale del script si el año no es un número de 4 dígitos
}
my $anio_actual = int($anio_actual_str); # Convertir a entero

# --- Calcular año de nacimiento ---

my $anio_nacimiento = $anio_actual - $edad;

# --- Determinar mayoría de edad ---

my $mayoria_edad = 18;
my $estado_edad;

if ($edad >= $mayoria_edad) {
    $estado_edad = "mayor de edad";
} else {
    $estado_edad = "menor de edad";
}

# --- Mostrar resultados ---

say "\n--- Resumen de tu información ---";
say "Nombre: $nombre";
say "Edad: $edad años";
say "Naciste aproximadamente en el año: $anio_nacimiento";
say "Eres $estado_edad.";

say "\n¡Gracias por usar nuestro script, $nombre!";