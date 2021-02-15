# BACKEND NODEJOS

Este proyecto esta desarrollado con nodejs, base de datos mongodb. el codigo se desarrollo con typescript, y se creo una carpeta dist. se tenian dos terminales, una con el comando tsc -w para que cada cambio que ocurriera en los archivos ts, creara su equivalente a js, en una carpeta dist, que le indicamos en el tsconfig.json

tambien se tenia otra terminal con el comando nodemon /dist/ para que ejecutara nuestra carpeta javascript y vieramos los cambios en tiempo real

## NOTAS

1. Si tenemos una interfaz con 'x atributos', per un caso necesitamos la misma interfaz pero con mas atributos, podemos unar lo siguiente: const Usuario:Usuario & { otraPropiedad: string }

- La base da datos usada es mongodb, luego de instalarla, para poder usarla debo tener corriendo en la consola lo siguiente: 'cd C:\Program Files\MongoDB\Server\4.4\bin\' luego 'mongo.exe'

## instalacion

 Este proyecto era una carpeta en blanco

1. se coloco en la consola *npm init* para crear el package.json presionando enter a todo

2. luego creo un index.ts, debemos tener instalado tsc en nuestra maquina, globalmente, asi mismo que nodemon *npm install -g nodemon*

3. ejecuta en la consola *tsc --init* para que cree un archivo tsconfig.json el cual tendra la configuracion de nuestro ts, 

4. luego de creado el archivo *tsconfig.json*, se edita este archivo, cambiando el target, de es5 a es6. asi mismo en ese archivo, descomenta la linea  *"outDir"*, y se cambia por "outDir": "dist/",   para que cree una carpeta dist donde estaran los .js que genere

5. para que cada cambio que realice en mi archivo ts se refleje en el .js, debo tener en una consola el comando : *tsc -w*

6. se debe abir otra terminal, y ejecutar el comando: *nodemon .dist/*, este comando hara que cada cambio que ocurra en el archivo js, se ejecute instantaneamente, logrando con ello ver en la consola cada cambio que hagamos a la programacion

7. ejecutar la instalacion de *express* con otras cosas: *npm install express body-parser cors mongoose express-fileupload jsonwebtoken bcrypt*  tambien npm i --save-dev @types/bcrypt    otro: npm i --save-dev @types/jsonwebtoken 
    > npm i --save-dev @types/express-fileupload

    > npm install --save uniqid 

    > npm i --save-dev @types/uniqid

8. debemos tener dos consolas abiertas, en una *tsc-w* y en la otra *nodemon .\dist\ *

9. creamos la carpeta clases, en ella creamos un archivo llamado server.ts

10. debemos instalar npm i --save-dev @types/express para poder importar express en nuestro proyecto. -save-dev es para dependencias de desarrollo, las cuales al hacer paso a produccion no subiran

11. 