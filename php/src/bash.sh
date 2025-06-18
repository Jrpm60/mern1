#!/bin/bash

# --- Pedir información al usuario ---

echo "¡Hola! ¿Cuál es tu nombre?"
read nombre # Lee la entrada del usuario y la guarda en la variable 'nombre'

echo "Hola, $nombre. ¿Cuántos años tienes?"
read edad_str

# Validar que la edad sea un número
if ! [[ "$edad_str" =~ ^[0-9]+$ ]]; then
    echo "¡Eso no parece un número para la edad! Por favor, ejecuta el script de nuevo y introduce una edad válida."
    exit 1 # Sale del script con un código de error
fi
edad=$edad_str # Asignar el valor a una variable sin el _str

echo "¿En qué año estamos actualmente (por ejemplo, 2025)?"
read anio_actual_str

# Validar que el año actual sea un número de 4 dígitos
if ! [[ "$anio_actual_str" =~ ^[0-9]{4}$ ]]; then
    echo "¡Eso no parece un año válido (cuatro dígitos)! Por favor, ejecuta el script de nuevo."
    exit 1 # Sale del script con un código de error
fi
anio_actual=$anio_actual_str # Asignar el valor a una variable sin el _str

# --- Calcular año de nacimiento ---

# Bash solo soporta aritmética de enteros con $((...))
anio_nacimiento=$((anio_actual - edad))

# --- Determinar mayoría de edad ---

mayoria_edad=18
estado_edad="" # Inicializar la variable

if (( edad >= mayoria_edad )); then
    estado_edad="mayor de edad"
else
    estado_edad="menor de edad"
fi

# --- Mostrar resultados ---

echo "" # Imprimir una línea en blanco
echo "--- Resumen de tu información ---"
echo "Nombre: $nombre"
echo "Edad: $edad años"
echo "Naciste aproximadamente en el año: $anio_nacimiento"
echo "Eres $estado_edad."

echo "" # Imprimir una línea en blanco
echo "¡Gracias por usar nuestro script, $nombre!"