const { sumar, dividir, restar, redondear, convertirDuracion } = require('./math');


describe('Test Math', ()=> {

    test('deberia sumar dos numeros', () => {
        expect(sumar(1, 2)).toBe(3);
        expect(sumar(2, 4)).toBe(6);
        expect(typeof sumar(5,5)).toBe("number");
    });

    test('deberia dividir dos numeros', () => {
        expect(dividir(30, 15)).toBe(2);
        expect(dividir(24, 3)).toBe(8);
        expect(()=> dividir(10,0)).toThrowError('No se puede dividir entre cero')
    
    });

    test('deberia resta dos numeros', () => {
        expect(restar(6, 2)).toBe(4);
        
    });

    test('deberia redondear a dos decimales ', () => {        
        expect(redondear(9.999)).toBe("$10.00");
        expect(redondear(9.994)).toBe("$9.99");
        expect(redondear(9.995)).toBe("$9.99");
        expect(redondear(9.996)).toBe("$10.00");
        
    });

    test('covertir tempotales', () => {        
        expect(convertirDuracion(120,"segundos","minutos")).toBe(2);
        expect(convertirDuracion(120,"segundos","segundos")).toBe(120);
        expect(convertirDuracion(2,"minutos","segundos")).toBe(120);


        
    });









})