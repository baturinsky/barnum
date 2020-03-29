const intro = {
  eng:`Analyse your personality using Barnum-Forer method. All it uses is the way you move the mouse.
Just start moving the cursor around until the line disappears.`,
  ru: `Проанализируйте Вашу личность методом Барнума-Леви-Форера. Метод основан на анализе движений мыши. 
  Водите курсором, пока линия не исчезнет.`
};

const lines = {
  eng: [
    "You have a great need for other people to like and admire you.",
    "You have a tendency to be critical of yourself.",
    "You have a great deal of unused capacity which you have not turned to your advantage.",
    "While you have some personality weaknesses, you are generally able to compensate for them.",
    "Your sexual adjustment has presented problems for you.",
    "Disciplined and self-controlled outside, you tend to be worrisome and insecure inside.",
    "At times you have serious doubts as to whether you have made the right decision or done the right thing.",
    "You prefer a certain amount of change and variety and become dissatisfied when hemmed in by restrictions and limitations.",
    "You pride yourself as an independent thinker and do not accept others' statements without satisfactory proof.",
    "You have found it unwise to be too frank in revealing yourself to others.",
    "At times you are extroverted, affable, sociable, while at other times you are introverted, wary, reserved.",
    "Some of your aspirations tend to be pretty unrealistic.",
    "Security is one of your major goals in life."
  ],
  ru: [
    "По натуре Вы доверчивый человек, но жизнь научила Вас осторожности.",
    "Лишь одному-двум людям Вы решаетесь доверить самое сокровенное, но и при этом всегда испытываете чувство невысказанности.",
    "С некоторых пор Вы поняли, что по самому большому счёту человек безысходно одинок, но Вы уже почти смирились с этим и рады, что есть по крайней мере немногие люди, с которыми об этом можно забывать.",
    "Вы довольно-таки упрямы, но Ваша воля иногда Вам отказывает, и это сильно переживается.",
    "Вам хотелось бы быть более уверенным в себе, в некоторые моменты Вы просто презираете себя за неуверенность - ведь, в сущности, Вы понимаете, что не хуже других.",
    "Бываете раздражительны, иногда не в силах сдержаться, особенно с близкими людьми, и потом жалеете о своих вспышках.",
    "Нельзя сказать, чтобы Вы не были эгоистичны, иногда даже очень, но вместе с тем Вы способны, забывая о себе, делать многое для других, и если взглянуть на Вашу жизнь в целом, то она представляет собой, пожалуй, во многих отношениях жертву ради тех, кто рядом с вами.",
    "Иногда Вам кажется, что Вас хитро и деспотично используют, Вас охватывает бессильное негодование.",
    "Много сил уходит на обыденщину, на нудную текучку, много задатков остается нереализованными, да что говорить… Вы уже давно видите, сколько у людей лжи, сколько утомительных, никому не нужных фарсов, мышиной возни, непроходимой тупости - всё это рядом, и сами Вы во всём этом участвуете, и Вам противно, - а всё же где-то, почти неосознанно, остаётся вера в настоящее, нет-нет и прорвётся.",
    "Вы самолюбивы и обидчивы, но по большей части умеете это скрывать.",
    "Вам свойственно чувство зависти, Вы не всегда в нём сознаётесь даже себе, но Вы способны от души радоваться успехам людей, Вам близких и симпатичных."
  ]
};

const restartText = {eng:"Restart", ru:"Заново"};

let lang = window.location.hash == "#ru"?"ru":"eng";

window.onload = () => {
  let uiDiv = document.getElementById("ui");
  let barDiv = document.getElementById("bar");
  let restartButton = document.getElementById("restart");
  let langButton = document.getElementById("lang");

  let move;
  const moveMax = 10000;

  function reset() {
    move = 0;
    uiDiv.innerHTML = intro[lang];
    restartButton.innerHTML = restartText[lang];
    langButton.innerHTML = lang.toUpperCase();
    restartButton.style.display = "none";
    barDiv.style.width = "100%";
  }

  function onmove(dist){
    if (move < moveMax) {
      move += dist;
      barDiv.style.width = 100 * (1 - move / moveMax) + "%";
      if (move >= moveMax) {
        let reading = lines[lang]
          .sort(function() {
            return 0.5 - Math.random();
          })
          .join(" ");
        uiDiv.innerHTML = reading;
        restartButton.style.display = "block";
        barDiv.style.width = 0;
      }
    }
  }

  restartButton.onclick = reset;

  langButton.onclick = e => {
    lang = lang=="ru"?"eng":"ru";
    window.location.hash = lang=="ru"?"#ru":"";
    reset();
  }

  window.onmousemove = e => {
    onmove(Math.abs(e.movementX) + Math.abs(e.movementY))
  };

  window.onmousedown = e => {
    onmove(300);
  }

  ScreenOrientation.onchange = e => {
    onmove(300);
  }

  reset();
};
