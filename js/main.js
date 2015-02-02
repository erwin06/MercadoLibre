/*
 * dado n menor o igual que 120, para determinar su primalidad basta comprobar 
 * si es divisible entre 2, 3, 5 y 7, ya que el siguiente número primo, 11, 
 * ya es mayor que √120
 */

/**
 * Verifica si un número es par o impar
 * @param {int} number número a verificar
 * @returns {Boolean} true si es par, false si es impar
 */
function isPair(number) {
    if (number % 2 == 0)
        return true;
    return false;
}

/**
 * Verifica si un número es primo o no
 * @param {int} number Número a verificar
 * @returns {Boolean} true si es primo / false si no lo es
 */
function isPrime(number) {
    for (var i = 2; i * i <= number; i++) {
        if (number % i == 0)
            return false;
    }
    return true;
}

/**
 * Envía el último número de una cadena al principio de la misma. Por ejemplo:
 * 123 -> 312 -> 231 -> 123
 * @param {int} number Número a modificar
 * @returns {int} Número modificado / retorna "-1" cuando el número contiene un 
 * par, ya que si tiene un par no es posible que sea primo circular
 */
function orbit(number) {
    var firstNumbers = parseInt(number / 10);
    var lastNumber = number % 10;
    number = firstNumbers;
    while (number != 0) {
        if (isPair(number))
            return -1;
        lastNumber = lastNumber * 10;
        number = parseInt(number / 10);

    }
    return lastNumber += firstNumbers;
}

/**
 * Limpia el resultado de la obtención.
 */
function clean() {
    var element = document.getElementById('lbResult');
    var countResult = document.getElementById('lbCountResult');
    var btnClean = document.getElementById('btnClean');
    if (element)
        element.innerHTML = "";
    if (countResult)
        countResult.innerHTML = '';
    if (btnClean)
        btnClean.disabled = true;
}

/**
 * Verifica si un número ingresado por el usuario es primo circular.  Muestra
 * el resultado por pantalla
 */
function check() {
    var element = document.getElementById('inpValue');
    var result = document.getElementById('lbResultExtra');
    if (element && result) {
        var value = element.value;
        if (value == 1) {
            result.innerHTML = "No, no es primo circular.";
        } else {
            var isCP = isCircularPrime(value);
            if (isCP) {
                result.innerHTML = "Si, es primo circular.";
            } else {
                result.innerHTML = "No, no es primo circular.";
            }
        }
    }

    return false;
}


/**
 * Obtiene los primeros N números primos circulares menores a 1.000.000 y lo
 * muestra por pantalla
 */
function get() {
    var primes = [];
    primes[2] = 2;
    var a = 0;

    setTimeout(function () {
        for (var i = 3; i < 500000; i++, i++) {
            primes[i] = i;
        }
        start();
    }, 0);
    setTimeout(function () {
        for (var i = 500001; i < 1000000; i++, i++) {
            primes[i] = i;
        }
        start();
    }, 0);

    function start() {
        // Comprobación para que no comience a menos que hayan terminado ambos hilos
        if (a == 1) {
            // Filtro el arreglo con números primos circulares
            primes = primes.filter(function (prime) {
                return isCircularPrime(prime);
            });

            var element = document.getElementById('lbResult');
            var countResult = document.getElementById('lbCountResult');
            if (element) {
                countResult.innerHTML = "Cantidad de números primos circulares menores a 1.000.000: " + primes.length;
                element.innerHTML = "Lista de números: " + primes;
                var btnClean = document.getElementById('btnClean');
                if (btnClean)
                    btnClean.disabled = false;
            }
        } else
            a++;
    }
}

/**
 * Función que verifica si un número es circular o no
 * @param {int} number Número a verificar
 * @returns {Boolean} true si es circular / false si no lo es
 */
function isCircularPrime(number) {
    // Verifico si es primo
    if (isPrime(number)) {
        var nextDigit = number;
        // Verifico todas las combinaciones
        while ((nextDigit = orbit(nextDigit)) != number) {
            if (nextDigit == -1 || !isPrime(nextDigit)) {
                return false;
            }
        }
        return true;
    } else
        return false;
}