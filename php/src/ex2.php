<!DOCTYPE html>
<html>
    <head>
        <title>Simple POST Form</title>
    </head>

    <body>
        <h2>Introduce tu nombre</h2>
            <form method="post" action="">
                <label for="name">Nombre:</label>
                <input type="text" id="name" name="name" required>
                <button type="submit">Submit</button>
            </form>

                <?php
                if ($_SERVER["REQUEST_METHOD"] == "POST") {
                    $name = htmlspecialchars(trim($_POST['name'] ?? ''));
                    if ($name !== '') {
                        echo "<h3>Hello, " . $name . "!</h3>";
                    } else {
                        echo "<p>Please enter a valid name.</p>";
                    }
                }
                ?>
                
    </body>
</html>