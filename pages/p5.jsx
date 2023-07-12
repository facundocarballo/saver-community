import React from "react";
import dynamic from "next/dynamic";
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false,
});

function P5() {
  const width = 800;
  const height = 800;
  const radio = 10;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(width, height).parent(canvasParentRef);
  };

  const draw = (p5) => {
    p5.background(0);

    let coorX = width / 2;
    let coorY = height / 2;

    let r = 40;
    let offset = 30;
    let angle = 0;
    let step = p5.PI/12;

    // Raiz
    // p5.circle(coorX, coorY, radio);

    // Primer nivel
    p5.translate(width / 2, height / 2);

    for (var i = 0; i < 48; i++)
    {
      var x = r * p5.sin(angle);
      var y = r * p5.cos(angle);
      p5.fill("red")
      p5.ellipse(x, y, 10);

      angle = angle + step;
    }

    step = p5.PI/12;
    // Segundo nivel
    r += offset;
    
    for (var i = 0; i < 24; i++)
    {
      var x = r * p5.sin(angle);
      var y = r * p5.cos(angle);
      p5.fill("orange")
      p5.ellipse(x, y, 10);

      angle = angle + step;
    }

    // Tercer nivel
    r += offset;
    
    for (var i = 0; i < 24; i++)
    {
      var x = r * p5.sin(angle);
      var y = r * p5.cos(angle);
      p5.fill("green")
      p5.ellipse(x, y, 10);

      angle = angle + step;
    }

    // Cuarto nivel
    r += offset;
    
    for (var i = 0; i < 24; i++)
    {
      var x = r * p5.sin(angle);
      var y = r * p5.cos(angle);
      p5.fill("blue")
      p5.ellipse(x, y, 10);

      angle = angle + step;
    }

    // Quinto nivel
    r += offset;
    
    for (var i = 0; i < 24; i++)
    {
      var x = r * p5.sin(angle);
      var y = r * p5.cos(angle);
      p5.fill("purple")
      p5.ellipse(x, y, 10);

      angle = angle + step;
    }

    // Sexto nivel
    r += offset;
    
    for (var i = 0; i < 24; i++)
    {
      var x = r * p5.sin(angle);
      var y = r * p5.cos(angle);
      p5.fill("yellow")
      p5.ellipse(x, y, 10);

      angle = angle + step;
    }

    // Septimo nivel
    r += offset;
    
    for (var i = 0; i < 24; i++)
    {
      var x = r * p5.sin(angle);
      var y = r * p5.cos(angle);
      p5.fill("pink")
      p5.ellipse(x, y, 10);

      angle = angle + step;
    }

    // Octavo nivel
    r += offset;
    
    for (var i = 0; i < 24; i++)
    {
      var x = r * p5.sin(angle);
      var y = r * p5.cos(angle);
      p5.fill("white")
      p5.ellipse(x, y, 10);

      angle = angle + step;
    }

    // Noveno nivel
    r += offset;
    
    for (var i = 0; i < 24; i++)
    {
      var x = r * p5.sin(angle);
      var y = r * p5.cos(angle);
      p5.fill("gray")
      p5.ellipse(x, y, 10);

      angle = angle + step;
    }

  };

  const dibujarCirculo = (x, y, radio, i, p5) => {
    if (i == 0) return;

    p5.circle(x / 2 - 50, y - 50, radio);

    dibujarCirculo(x - 50, y - 50, 20, i--);
  };

  return <Sketch setup={setup} draw={draw} />;
}

export default P5;
