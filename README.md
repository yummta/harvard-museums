## Getting Started

First, run the development server:

```bash
npm run dev
```

To be able to use the API you will need to create `.env.local` file with the following content:

```
NEXT_PUBLIC_APIKEY=00000000-0000-0000-0000-000000000000
```

Replace the NEXT_PUBLIC_APIKEY value with your own apikey. You can ask for one [here](https://docs.google.com/forms/d/e/1FAIpQLSfkmEBqH76HLMMiCC-GPPnhcvHC9aJS86E32dOd0Z8MpY2rvQ/viewform).

Now open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

---

# Revisión

## Concerns

### Concern 1

Cómo inicialmente parecía algo sencillo (el reto técnico) decidí aprovechar la oportunidad para utilizar `Nextjs`. He estado oyendo bastante sobre y creí que sería interesante aprenderlo resolviendo el reto. Si bien me alivió muchas configuraciones iniciales, de todas formas había una curva de aprendizaje de algunos conceptos básicos que me llevó un poco de tiempo entenderlo. No fue tanto un problema, pero tal vez para la próxima deba considerar si el usar una herramienta nueva para un reto técnico sea la mejor idea 🏳.

### Concern 2

No solo fue `next` con lo que decidí experimentar. Durante la semana pasada estuve leyendo sobre `intersection observer` y también quise utilizarlo en el reto. En vez de hacer el cálculo en base a estar calculando constantemente el scroll, traer más data cuando uno de los últimos elementos aparece en la pantalla. Esto también tuvo su pequeña curva de aprendizaje.

### Concern 3

El hecho de no tener una UI me hizo reconsiderar más de una vez cómo debería ser mi layout. Me llevó a invertir más tiempo. Al final opte por hacer algo sencillo pero igual me interesabe tener una presentación _de producto final_.

### Concern 4

Mi apikey estaba hardcoeada desde mi segundo commit. Si bien al final borré la credencial, esta seguía en el historial de cambios de git. La solución fue hacer un rebase interactivo y editar el commit donde se agregaba. _Primera vez que utilizo algo diferente a `squash` en un rebase interactivo._

### Conclusión

Calculé mal mis tiempos, y el utilizar herramientas nuevas tuvo un coste de tiempo que subestimé:

- Nextjs
- Intersection Observer
- Swr

Solución: Sacrifiqué los test 🙈.

## Explicación de la arquitectura que elegiste

Elegí utilizar `Nextjs` para no lidiar con configuraciones/arquitectura/deploy y centrarme en desarrollar el _producto_.

## Trade-offs que ves en tu implementación y si tuvieras más tiempo qué cambios o cosas diferente harías

### TODO

- [ ] Add tests 😔.
- [ ] Add support to mobile 😔.
- [ ] Add support for virtual scrolling.
- [ ] Fix image ratio. Currently they are fixed with the same size.

## Link a la parte del código que te sientas más orgulloso

https://github.com/yummta/harvard-museums/blob/main/pages/index.js#L18-L21

Aunque aquí es básicamente utilizar el hook, **me encató** la idea de usar el intersection obsever para hacer el request en vez de estar pendiente del scroll y hacer el calculo manualmente. Inicialmente pensé crearme un custom hook haciendo la implementación porque ya había jugado un poco con el intersection obsever nativo en codepen, pero por cuestion de tiempo decidí buscar la librería que terminé utilizando. No me arrepiento ✌🏾.
