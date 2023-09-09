const a = 1; const b = 2; const c = 3;

(function firstFunction () {
    const b = 5; const c = 6;
    const resc = c;
    
    (function secondFunction () {
        const b = 8;
        const resb = b;
        
        (function thirdFunction () {
            const a = 7; const c = 9;

            (function fourthFunction () {
                const a = 1; const c = 8;

                return console.log(`a: ${a}, b: ${resb}, c: ${resc}`);
            })()
        })()
    })()
})()
