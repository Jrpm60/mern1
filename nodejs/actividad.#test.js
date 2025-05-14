const {MiNombre, MiNombre2, getSaldo, tieneSuficientesaldo} = require('./actividad');


describe('Test Nombre', ()=> {

    test('El nombre deberia contener partes Maria fernandez', () => {
        expect(MiNombre()).toContain("Mari");
        expect(MiNombre()).toContain("Fernan");
        
    });

    test('El nombre Maria deberia esta en la lista del Array', () => {
        expect(MiNombre2()).toContain("Maria", "jon");
                
    });

    test('Saldo mayor que', () => {
        expect(getSaldo()).toBeGreaterThan(300);
        expect(typeof getSaldo()).toBe('number');
    
    });


    test('Saldo mayor a', () => {
        expect(tieneSuficientesaldo(400,300)).toBe(true);
        expect(tieneSuficientesaldo(100,300)).toBe(false);
    
    });




})