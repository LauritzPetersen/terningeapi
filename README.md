### at forbedre logformatet
### Agenten foreslog at ændre formatet, så hver linje i logfilen er et komplet JSON-objekt.
### endpointet blev linjen const logLine = blev ændret til at bruge JSON.stringify(responseData) + '\n';.
### jeg kørte /roll, og bekræftede at klienten fik et 200-svar, og tjekkede at filen data/rolls.log nu indeholdt data i JSON-format.
### Jeg omdøbte data-mappen til data-gemt, kørte /roll, og bekræftede at jeg modtog min 500-fejl JSON-besked i browseren.
### jeg fravalgte avt ændring til /history endpoint som nu returnere ubehandlede JSON-strenge
