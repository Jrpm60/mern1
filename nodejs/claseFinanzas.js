/**
 * Clase que realiza cálculos financieros.
 * @class
 */
class FinancialCalculator {
    /**
     * Crea una instancia del calculador financiero.
     * @constructor
     * @param {number} principal - El monto principal (la cantidad de dinero inicial).
     */
    constructor(principal) {
      /**
       * El monto inicial de dinero.
       * @type {number}
       */
      this.principal = principal;
    }
  
    /**
     * Calcula el interés compuesto.
     * 
     * La fórmula del interés compuesto es:
     * A = P (1 + r/n)^(nt)
     * Donde:
     *   - A es el monto acumulado después de n años, incluyendo el interés.
     *   - P es el monto principal (la cantidad de dinero inicial).
     *   - r es la tasa de interés anual (en forma decimal).
     *   - n es el número de veces que se compone el interés al año.
     *   - t es el tiempo en años.
     *
     * @param {number} rate - La tasa de interés anual (r) en formato decimal (por ejemplo, 0.05 para 5%).
     * @param {number} timesCompounded - El número de veces que se compone el interés al año (n).
     * @param {number} time - El tiempo en años (t).
     * @returns {number} - El monto acumulado (A) después del interés compuesto.
     * 
     * @example
     * const calc = new FinancialCalculator(1000);
     * const result = calc.calculateCompoundInterest(0.05, 4, 5);
     * console.log(result); // 1283.68
     */
    calculateCompoundInterest(rate, timesCompounded, time) {
      const amount = this.principal * Math.pow(1 + rate / timesCompounded, timesCompounded * time);
      return amount.toFixed(2); // Devuelve el monto acumulado, redondeado a 2 decimales
    }
  
    /**
     * Calcula el pago mensual de un préstamo utilizando la fórmula de amortización.
     * 
     * La fórmula del pago del préstamo es:
     * M = P [ r(1 + r)^n ] / [ (1 + r)^n - 1]
     * Donde:
     *   - M es el pago mensual total.
     *   - P es el monto del préstamo (principal).
     *   - r es la tasa de interés mensual (tasa anual dividida por 12).
     *   - n es el número de pagos (término del préstamo en meses).
     *
     * @param {number} annualRate - La tasa de interés anual (r) en formato decimal (por ejemplo, 0.05 para 5%).
     * @param {number} months - El número total de pagos (n), es decir, el término del préstamo en meses.
     * @returns {number} - El pago mensual (M).
     * 
     * @example
     * const calc = new FinancialCalculator(10000);
     * const monthlyPayment = calc.calculateLoanPayment(0.05, 60);
     * console.log(monthlyPayment); // 188.71
     */
    calculateLoanPayment(annualRate, months) {
      const monthlyRate = annualRate / 12;
      const payment = this.principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
      return payment.toFixed(2); // Devuelve el pago mensual, redondeado a 2 decimales
    }
  }
  
  // Ejemplo de uso
  
  const calculator = new FinancialCalculator(1000);
  
  // Cálculo de interés compuesto
  const compoundInterest = calculator.calculateCompoundInterest(0.05, 4, 5);
  console.log(`Interés compuesto: $${compoundInterest}`);
  
  // Cálculo de pago mensual de préstamo
  const loanPayment = calculator.calculateLoanPayment(0.05, 60);
  console.log(`Pago mensual del préstamo: $${loanPayment}`);
  
  