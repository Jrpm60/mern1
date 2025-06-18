<?php

$mysqli = new mysqli("mysql", "user", "userpass", "myapp"); 
if ($mysqli->connect_error) {
    die("Error de conexión: " . $mysqli->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (isset($_POST['delete_DEPTNO'])) {
        $DEPTNO_to_delete = (int)$_POST['delete_DEPTNO'];
        $stmt_delete = $mysqli->prepare("DELETE FROM departamentos WHERE DEPTNO = ?");
        $stmt_delete->bind_param("i", $DEPTNO_to_delete);
        if ($stmt_delete->execute()) {
            echo "Departamento borrado con éxito!<br>";
        } else {
            echo "Error al borrar: " . $stmt_delete->error . "<br>";
        }
        $stmt_delete->close();
    } elseif (isset($_POST['DEPTNO'], $_POST['DNAME'], $_POST['LOC'])) {
        $DEPTNO = (int)$_POST['DEPTNO'];
        $DNAME = $_POST['DNAME'];
        $LOC = $_POST['LOC'];

        $stmt = $mysqli->prepare("CALL usp_cu_departamento(?, ?, ?)");
        $stmt->bind_param("iss", $DEPTNO, $DNAME, $LOC);

        if ($stmt->execute()) {
            echo "Departamento creado/actualizado con éxito!<br>";
        } else {
            echo "Error al ejecutar: " . $stmt->error . "<br>";
        }
        $stmt->close();
    }
}

?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mantenimiento Departamentos</title>
</head>
<body>
    <h2>Mantenimiento Departamentos</h2>

    <form method="POST" action="">
        <label for="DEPTNO">Código Departamento:</label>
        <input type="number" id="DEPTNO" name="DEPTNO" required><br><br>

        <label for="DNAME">Nombre Departamento:</label>
        <input type="text" id="DNAME" name="DNAME" required><br><br>

        <label for="LOC">Localidad:</label>
        <input type="text" id="LOC" name="LOC" required><br><br><br>

        <button type="submit">Enviar</button>
    </form>

    ---

    <h2>Listado de Departamentos</h2>
    <table border="2">
        <tr>
            <th>Codigo</th>
            <th>Departamento</th>
            <th>Localidad</th>
            <th>Acciones</th>
        </tr>
        <?php
        $result = $mysqli->query("SELECT DEPTNO, DNAME, LOC FROM departamentos");

        if (!$result) {
            die("Error en la consulta: " . $mysqli->error);
        }

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                ?>
                <tr>
                    <td><?= htmlspecialchars($row['DEPTNO']) ?></td>
                    <td><?= htmlspecialchars($row['DNAME']) ?></td>
                    <td><?= htmlspecialchars($row['LOC']) ?></td>
                    <td>
                        <form method="POST" action="">
                            <input type="hidden" name="delete_DEPTNO" value="<?= htmlspecialchars($row['DEPTNO']) ?>">
                            <button type="submit">🗑️</button>
                        </form>
                    </td>
                </tr>
                <?php
            }
        } else {
            echo "<tr><td>No hay departamentos.</td></tr>";
        }

        $result->close();
        $mysqli->close();
        ?>
    </table>

</body>
</html>




