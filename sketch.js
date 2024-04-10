let sceneState = {
  HEART: 0,
  PULSE: 1,
  LIFE_TREE: 2,
};
let currentState = sceneState.HEART;
let heartBeatCount = 0; // track heart beat
let pulseProgress = 0; // track ECG progress


function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(255);
 
  switch (currentState) {
    case sceneState.HEART:
      heartScene();
      if (heartBeatCount >= 3) { // change to the next scene when heart beat 3 times
        currentState = sceneState.PULSE;
        heartBeatCount = 0; // reset count
      }
      break;
    case sceneState.PULSE:
      pulseScene();
      if (pulseProgress >= width - 100) { // change to the next scene when ECG progress get biggest
        currentState = sceneState.LIFE_TREE;
        pulseProgress = 0; // reset
      }
      break;
    case sceneState.LIFE_TREE:
      lifeTreeScene();
      break;
  }
}


function mousePressed() {
  currentState = (currentState + 1) % Object.keys(sceneState).length;// Object.keys(sceneState).length; use to back to first scene.
}


function heartScene() {
  let heartSize = 30 + 8 * sin(frameCount * 0.1);

  fill(255, 0, 0); // Move these outside the if statement
  stroke(0);
  strokeWeight(2);

  if (frameCount % 60 === 0) { 
    heartBeatCount++;
  }

  push();
  translate(width / 2, height / 2);
  beginShape();
  vertex(0, -heartSize / 2);
  bezierVertex(-heartSize / 2, -heartSize * 1.5, -heartSize, -heartSize / 2, 0, heartSize / 2);
  bezierVertex(heartSize, -heartSize / 2, heartSize / 2, -heartSize * 1.5, 0, -heartSize / 2);
  endShape(CLOSE);
  pop();
}

function pulseScene() {
  pulseProgress += 2;
  let pulseWidth = width - 100; // 脉搏波形的宽度
  let pulseHeight = 50; // 脉搏波形的高度
  let startX = 50; // 脉搏波形的起始X坐标
  let startY = height / 2; // 脉搏波形的Y坐标，放在屏幕中心

  stroke(255, 0, 0);
  strokeWeight(2);
  noFill();

  beginShape();
  for (let x = 0; x < pulseWidth; x++) {
    let t = (x / pulseWidth) * TAU; // 将x映射到一个完整的TAU周期
    let sinValue = sin(t * 2 + frameCount * 0.05); // 创建波形
    let y = startY + sinValue * pulseHeight;
    vertex(startX + x, y);
  }
  endShape();
}

function lifeTreeScene() {
  // 生命之树的基本参数
  let trunkHeight = 100; // 树干高度
  let trunkWidth = 20; // 树干宽度
  let leafSize = 8; // 叶子大小
  let growthRate = frameCount * 0.02; // 生长速率

  // 绘制树干
  fill(139, 69, 19); // 树干颜色
  noStroke();
  rect(width / 2 - trunkWidth / 2, height / 2, trunkWidth, -trunkHeight);

  // 绘制树叶
  fill(34, 139, 34); // 叶子颜色
  let angleOffset = frameCount * 0.05;
  for (let i = 0; i < TWO_PI; i += PI / 4) {
    let x = width / 2 + cos(i + angleOffset) * growthRate;
    let y = height / 2 - trunkHeight + sin(i + angleOffset) * growthRate;
    ellipse(x, y, leafSize, leafSize);
  }

  // 随着时间的推移，叶子逐渐增多和扩散
  if (growthRate > 25) {
    for (let j = 0; j < TWO_PI; j += PI / 8) {
      let outerX = width / 2 + cos(j - angleOffset) * (growthRate + 20);
      let outerY = height / 2 - trunkHeight + sin(j - angleOffset) * (growthRate + 20);
      ellipse(outerX, outerY, leafSize, leafSize);
    }
  }
}

