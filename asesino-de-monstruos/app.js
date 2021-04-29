new Vue({
    el: '#app',
    data: {
        saludJugador: 100,
        saludMonstruo: 100,
        hayUnaPartidaEnJuego: false,
        turnos: [], //es para registrar los eventos de la partida
        esJugador: false,
        rangoAtaque: [3, 10],
        rangoAtaqueEspecial: [10, 20],
        rangoAtaqueDelMonstruo: [5, 12],
    },

    methods: {
        getSalud(salud) {
            return `${salud}%`
        },
        empezarPartida: function () {
            this.hayUnaPartidaEnJuego = !this.hayUnaPartidaEnJuego
            this.saludJugador = 100
            this.saludMonstruo = 100
            this.turnos = []
        },

        atacar: function () {
            let ataque = this.calcularHeridas(this.rangoAtaque)

            this.saludMonstruo -= ataque
          
            this.registrarEvento(true, 'El jugador ataca por '+ ataque)


            if(this.verificarGanador()){
                return;
            }

            this.ataqueDelMonstruo()       
        },  

        ataqueEspecial: function () {
            let ataque = this.calcularHeridas(this.rangoAtaqueEspecial)

            this.saludMonstruo -= ataque
           
            this.registrarEvento(true,'El jugador ataca con su especial por '+ ataque)

            if(this.verificarGanador()){
                return;
            } 

            this.ataqueDelMonstruo()
        },

        curar: function () {
            var cantidadACurar = Math.floor(Math.random() * 10) + 1
            this.saludJugador += cantidadACurar

            if  (this.saludJugador > 100) this.saludJugador = 100

            this.registrarEvento(true,'El jugador se cura en '+ cantidadACurar)

            this.ataqueDelMonstruo()
        },

        registrarEvento(jugador, texto) {
            this.turnos.unshift({
                esJugador: jugador,
                text: texto 
            });

        },
        terminarPartida: function () {
            this.hayUnaPartidaEnJuego = false
        },

        ataqueDelMonstruo: function () {
            let ataque = this.calcularHeridas(this.rangoAtaqueDelMonstruo)

            this.saludJugador -= ataque

            if(this.verificarGanador()){
                return;
            } 

            this.registrarEvento(false,'El monstruo golpeó por '+ ataque)

        },

        calcularHeridas: function (rangos) {
            return Math.max(Math.floor(Math.random() * rangos[1]) + 1, rangos[0])
        },

        verificarGanador: function () {
                if (this.saludMonstruo < 0) {
                    alert("El jugador ganó la partida")
                    this.empezarPartida()
                    return true
                } else if (this.saludJugador < 0) {
                    alert("El monstruo ganó la partida")
                    this.empezarPartida()
                    return true
                }

        },
        cssEvento(turno) {
            //Este return de un objeto es prque vue asi lo requiere, pero ponerlo acá queda mucho mas entendible en el codigo HTML.
            return {
                'player-turno': turno.esJugador,
                'monster-turno': !turno.esJugador
            }
        }
    }
});