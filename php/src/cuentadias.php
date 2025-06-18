<!DOCTYPE html>
<html>
<head>
    <title>Días Vividos</title>
</head>
<body>

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fechaNacimientoStr = $_POST['fecha_nacimiento'];

    try {
        $fechaNacimiento = new DateTime($fechaNacimientoStr);
        $fechaActual = new DateTime();
        $diferencia = $fechaNacimiento->diff($fechaActual);
        $diasVivos = $diferencia->days;

        echo "<h2>Has vivido un total de " . $diasVivos . " días.</h2>";
    } catch (Exception $e) {
        echo "<p>Por favor, introduce una fecha de nacimiento válida.</p>";
    }
}
?>

<h2>Calcula cuántos días has vivido</h2>
<form method="post" action="">
    <label for="fecha_nacimiento">Introduce tu fecha de nacimiento (YYYY-MM-DD):</label><br>
    <input type="date" id="fecha_nacimiento" name="fecha_nacimiento" required><br><br>
    <button type="submit">Calcular Días</button>
</form>

</body>
</html>