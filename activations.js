const activationFunctions = {
    abs: (num) => Math.abs(num),
    clamped: (num) => clamp(num, -1.0, 1.0),
    cube: (num) => num**3,
    exp: (num) => E**(num),
    gauss: (num) => E**(-0.5 * (num)**2),
    hat: (num) => (1 - min(Math.abs(num), 1)),
    identity: (num) => num,
    inv: (num) => 1 / (num + SMALL),
    log: (num) => Math.log(clamp(num, SMALL, num)),
    relu: (num) => clamp(num, 0, num),
    elu: (num) => num > 0 ? num : E**(num) - 1,
    sigmoid: (num) => 1 / (1 + E**(-num)),
    tanh: (num) => Math.tanh(num),
    square: (num) => num**2,
    sin: (num) => Math.sin(num),
    hyp: (num) => (E**num - E**(-num)) / (E**num + E**(-num))
}