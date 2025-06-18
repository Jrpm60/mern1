<?php
    // Connect to MySQL
    $mysqli = new mysqli("mysql", "user", "userpass", "myapp");
    // Check connection
    if ($mysqli->connect_error) {
        die("Connection failed: " . $mysqli->connect_error);
    }
    // Query the database
    $result = $mysqli->query("SELECT * FROM EMP");
    if (!$result) {
        die("Query error: " . $mysqli->error);
    }
    ?>
    <!DOCTYPE html>
    <html>
    <head>
        <title>Test Table Data</title>
        <style>
            table { border-collapse: collapse; width: 50%; margin: 20px auto; }
            th, td { border: 1px solid #aaa; padding: 8px; text-align: left; }
        </style>
    </head>

    <body>

        <h2>Introduce nuevo Empleado</h2>

        <form method="post" action="">
            <label for="ENAME">Nombre:</label>
            <input type="text" id="ENAME" name="ENAME" required> <br>

            <label for="EMPNO">Empleado (num):</label>
            <input type="INT" id="EMPNO" name="EMPNO" required> <br>

            <label for="DEPTNO">Deptno (num):</label>
            <input type="INT" id="DEPTNO" name="DEPTNO" required> <br>

            <label for="JOB">Puesto:</label>
            <input type="text" id="JOB" name="JOB" required> <br>

            <button type="submit">Submit</button>
        </form>

        <?php

        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            // Sanitize and get the submitted name
        $ENAME = htmlspecialchars(trim($_POST['ENAME'] ?? ''));
        $EMPNO = htmlspecialchars(trim($_POST[EMPNO] ?? ''));
        $DEPTNO = htmlspecialchars(trim($_POST[DEPTNO] ?? ''));
        $JOB = htmlspecialchars(trim($_POST['JOB'] ?? ''));

        $result = $mysqli->query("INSERT INTO EMP VALUES ('$ENAME',$EMPNO,$DEPTNO,'$JOB')");
        }
        

        ?>
        
            <h2 style="text-align:center;">Test Table Data</h2>
            <table>
                <tr>
                    <th>Nombre</th>            
                    <th>Empleado (num)</th>
                    <th>Deptno (num)</th>            
                    <th>Puesto</th>
                </tr>
                <?php while($row = $result->fetch_assoc()): ?>
                <tr>
                    <td><?= htmlspecialchars($row['ENAME']) ?></td>
                    <td><?= htmlspecialchars($row['EMPNO']) ?></td>
                    <td><?= htmlspecialchars($row['DEPTNO']) ?></td>           
                    <td><?= htmlspecialchars($row['JOB']) ?></td>
                </tr>
                <?php endwhile; ?>
            </table>
    </body>
    </html>

<?php
$mysqli->close();
?>