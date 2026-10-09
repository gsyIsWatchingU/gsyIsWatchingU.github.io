(function(){
"use strict";
// 近景中的厨房物件与场景采用同一组名称，点击物件本身查看细节。
const KITCHEN_OBJECTS={
  bun:{name:'干硬面包',text:'表皮裂开了，边缘长着灰白的霉。'},
  patty:{name:'发绿肉饼',text:'油脂凝在凹坑里。绿色霉斑已经连成片。'},
  tomato:{name:'干瘪番茄',text:'果皮皱缩，蒂还粘在上面。'},
  lettuce:{name:'枯萎生菜',text:'叶缘卷起，叶脉发黄。'},
  spatula:{name:'旧锅铲',text:'铲头有三道长孔，木柄被握得发亮。'},
  fork:{name:'弯齿餐叉',text:'最边上的一根叉齿弯了。'},
  salt:{name:'盐罐',text:'玻璃里结着白色盐块，盖上的小孔堵住了。'},
  tin:{name:'旧调料罐',text:'盖沿生锈了。里面只剩一点褐色粉末。'},
  cloth:{name:'折好的擦布',text:'布角磨出了线头，中间留着一圈水渍。'},
  spoon:{name:'量勺',text:'半圆的勺底，刻着 5 ml。'}
};
const DRAWER_CONTENTS=[['spatula','fork'],['salt','tin'],['cloth','spoon']];
function kitchenObject(id){
  const art={
    bun:'<path fill="#ad844f" d="M29 99Q23 41 81 31q60-5 72 52l-5 31q-58 19-117-1z"/><path fill="#d3b17a" d="M29 92q57 17 124-9l-5 28q-59 20-117-1z"/><path d="m53 59 18 14-12 13m42-44-10 15 16 16m28-8-12 13" fill="none"/><g fill="#8d9b7a"><circle cx="47" cy="99" r="8"/><circle cx="63" cy="104" r="5"/><circle cx="132" cy="88" r="7"/></g><g stroke="#dcc49a" stroke-width="3"><path d="m61 47 6-2m41 2 6 2m-28-9 5 1"/></g>',
    patty:'<path fill="#433b2c" d="m25 83 7-22 20-13 20-4 25 5 23-2 27 16 8 21-8 23-30 14-32-4-30 3-24-17z"/><path fill="#6e5a40" d="m32 70 21-16 27-2 20 5 25-4 22 19-13 19-23 8-24-5-29 4-25-13z"/><g fill="#697b4c"><ellipse cx="63" cy="72" rx="18" ry="10"/><ellipse cx="113" cy="80" rx="20" ry="13"/><circle cx="80" cy="93" r="7"/></g><g fill="#b2b284"><circle cx="52" cy="70" r="3"/><circle cx="119" cy="77" r="4"/></g><g fill="#352d24"><circle cx="83" cy="62" r="4"/><circle cx="43" cy="87" r="3"/></g>',
    tomato:'<path fill="#924e3f" d="M46 55q20-25 43-15 27-7 42 15l8 25-6 25-19 12-24-7-24 5-18-16-7-22z"/><path fill="none" stroke="#613f31" d="M66 57q-13 25 4 43m21-46q-9 19 3 49m24-42q15 26-4 41"/><path fill="#65704b" d="m88 53-22-6 14-5-5-12 16 9 14-9-3 15 16 6-21 4z"/><path d="m90 41 4-15" stroke="#74835a" stroke-width="6"/>',
    lettuce:'<path fill="#687346" d="m89 116-26-7-12 4-12-23-14-10 12-20-1-20 24 2 16-18 19 15 27-10 6 24 26 5-6 24 9 15-21 15-4 16z"/><path fill="#8b8b56" d="m90 111-20-16-15-7 7-15-7-23 26 6 16-12 10 18 20-1-6 24-20 9z"/><g fill="none" stroke="#b3aa71" stroke-width="3"><path d="m85 127 11-73m-9 48-30-30m35 19 26-22m-28 4L74 59"/></g>',
    spatula:'<path fill="#86613c" d="m85 73 16 1-6 61H82z"/><path fill="#9faaa2" d="m58 27 63 3-10 49-37 1z"/><path d="m75 39 6 28m12-27 1 27m11-26-3 26" stroke="#465b52" stroke-width="5"/><circle cx="89" cy="122" r="3" fill="#362f24"/>',
    fork:'<path d="m70 28 3 33 16 11 2 58m15-102-2 34-15 10m-1-45 1 45m-15-42-3 27" stroke="#a8b0a5" stroke-width="7" fill="none"/>',
    salt:'<path fill="#87a09a" fill-opacity=".55" d="m57 51 6 76h59l5-76z"/><path fill="#d1ccb0" d="m64 90 5 33h47l3-35-19 3-13-7-11 9z"/><path fill="#a3a68d" d="M55 38h74v18H55z"/><path d="M63 40h56" stroke="#d2c8a5" stroke-width="5"/><g fill="#48584d"><circle cx="76" cy="47" r="2"/><circle cx="92" cy="47" r="2"/><circle cx="108" cy="47" r="2"/></g><path d="m69 61 3 20" stroke="#c4d3bd" stroke-width="3"/>',
    tin:'<path fill="#7e7350" d="M42 53h99v72q-50 17-99 0z"/><ellipse fill="#ad9970" cx="91" cy="52" rx="50" ry="16"/><ellipse fill="#4c382b" cx="91" cy="54" rx="40" ry="10"/><path fill="#849b83" d="M44 72h94v28H44z"/><path d="M51 111h79M56 117h21" stroke="#553e2b"/><path d="M61 48q33-12 61 3" stroke="#826348" fill="none"/>',
    cloth:'<path fill="#869a89" d="m26 67 92-26 39 52-87 31z"/><path fill="#b0b99c" d="m26 59 92-26 37 54-86 27z"/><g fill="none" stroke="#5e796c" stroke-width="3"><path d="m46 53 33 53m-11-60 32 53m-11-59 32 53m-87-18 105-27M49 91l99-29"/></g><ellipse cx="99" cy="73" rx="18" ry="12" fill="none" stroke="#9c9070" stroke-width="5"/><path d="m71 114-3 9m8-11-2 8m9-12v9" stroke="#c4c8ac"/>',
    spoon:'<ellipse fill="#9caaa3" cx="91" cy="48" rx="31" ry="22"/><ellipse fill="#647c73" cx="91" cy="47" rx="23" ry="14"/><path fill="#b0b7a7" d="M84 70h14l-2 64H87z"/><path d="M87 103h8m-7 5h6" stroke="#5c736a"/>'
  };
  return `<svg viewBox="0 0 180 155" role="img" aria-label="${KITCHEN_OBJECTS[id].name}"><ellipse cx="91" cy="136" rx="58" ry="7" fill="#142720" opacity=".3"/><g stroke="#353e2b" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round">${art[id]}</g></svg>`;
}
// 合影与保险柜共用本地矢量人物，保持人物外观和顺序一致。
const faces={
    sponge:'<path fill="#d3be58" d="M22 17h56v57H22z"/><path fill="#e6dbbb" d="M22 67h56v10H22z"/><path fill="#695546" d="M22 77h56v10H22z"/><path fill="#982f42" d="m46 69 4 11 4-11z"/><g fill="#8b883d"><circle cx="30" cy="27" r="4"/><circle cx="70" cy="35" r="3"/><circle cx="28" cy="55" r="3"/></g><ellipse fill="#eee9d1" cx="40" cy="41" rx="10" ry="12"/><ellipse fill="#eee9d1" cx="61" cy="41" rx="10" ry="12"/><g fill="#347b83"><circle cx="42" cy="42" r="5"/><circle cx="60" cy="42" r="5"/></g><path d="M36 57q14 12 29-1"/><path fill="#d3be58" d="M49 42h9v13h-9z"/>',
    patrick:'<path fill="#be8585" d="m50 12 12 30 25 14-20 5 4 26H29l4-26-20-5 25-14z"/><path fill="#82976b" d="M31 69h38l2 18H29z"/><path fill="#816084" d="m35 75 5-6 7 7-6 8zm22 0 6-5 5 7-8 6z"/><g fill="#ece6d5"><ellipse cx="44" cy="43" rx="6" ry="9"/><ellipse cx="56" cy="43" rx="6" ry="9"/></g><circle cx="46" cy="45" r="2"/><circle cx="55" cy="45" r="2"/><path d="M40 57q10 9 20 0"/>',
    squid:'<ellipse fill="#7eaca5" cx="50" cy="33" rx="23" ry="20"/><path fill="#7eaca5" d="M35 35h30v29H35z"/><path fill="#876c48" d="M29 65h42v22H29z"/><g fill="#e1d9ae"><ellipse cx="42" cy="40" rx="7" ry="10"/><ellipse cx="58" cy="40" rx="7" ry="10"/></g><path d="M35 38h14m2 0h14M40 60h20"/><path fill="#72a19a" d="M45 38h10l8 24H41z"/>',
    employee:'<path fill="#d9d4bd" d="M25 23h50v12H25z"/><path fill="#405257" d="M31 35h38v31H31z"/><path fill="#ced2c0" d="m28 66 22-6 22 6 9 22H19z"/><path fill="#345e65" d="M35 65h30v23H35z"/><path fill="#c3a16c" d="M58 75h10v7H58z"/>',
};
function portrait(id) {
  return `<svg viewBox="0 0 100 100" aria-hidden="true"><rect width="100" height="100" fill="#253c3e"/><g stroke="#202729" stroke-width="2" stroke-linejoin="round">${faces[id]||faces.employee}</g></svg>`;
}
function employeePhoto(extraEmployee=false,recovered=false) {
  const ids=['patrick','sponge','squid','employee'];
  const names={patrick:'派大星',sponge:'海绵宝宝',squid:'章鱼哥',employee:recovered?'小海':'员工 001'};
  const duties={patrick:'常客',sponge:'厨师',squid:'收银员',employee:'夜班员工'};
  const limbs={
    patrick:'<path fill="#be8585" d="m30 83-5 13h19l4-10m5 0 4 10h19l-7-13"/>',
    sponge:'<path fill="none" stroke="#d3be58" stroke-width="5" d="m22 52-8 18m64-18 8 18M36 86v10m28-10v10"/><path fill="#302b29" d="M25 94h17v5H23zm33 0h17l2 5H58z"/>',
    squid:'<path fill="none" stroke="#7eaca5" stroke-width="5" d="m30 68-9 17m49-17 9 17M38 84l-5 12h-8m23-12v12h-6m12-12v12h6m2-12 5 12h8"/><g fill="#202729"><circle cx="43" cy="43" r="2"/><circle cx="57" cy="43" r="2"/></g>',
    employee:'<path fill="#405257" d="M30 86h15v13H28zm25 0h15l2 13H55z"/><text x="63" y="81" fill="#273e42" stroke="none" font-size="6" text-anchor="middle">001</text>'
  };
  const step=760/ids.length,scale=ids.length===4?2.45:3.1;
  const people=ids.map((id,i)=>{
    const x=70+step*(i+.5);
    const features=id==='squid'?'<g fill="#202729"><circle cx="43" cy="43" r="2"/><circle cx="57" cy="43" r="2"/></g>':id==='employee'?'<text x="63" y="81" fill="#273e42" stroke="none" font-size="6" text-anchor="middle">001</text>':'';
    const smile=recovered&&id==='employee'?'<ellipse cx="50" cy="50" rx="14" ry="13" fill="#c3a17c"/><path d="M42 53q8 9 16 0" fill="none"/><circle cx="45" cy="46" r="1.5"/><circle cx="55" cy="46" r="1.5"/>':recovered&&id==='squid'?'<path d="M40 60q10 5 20 0" fill="none"/>':'';
    return `<g data-person="${id}" transform="translate(${x-scale*50} ${470-scale*100}) scale(${scale})" stroke="#202729" stroke-width="1.6" stroke-linejoin="round">${limbs[id]}${faces[id]}${features}${smile}${id==='employee'?'<path d="m70 67 11 9" stroke="#8b6c46" stroke-width="3"/><path d="m76 70 6-3 4 4-5 5-3-2z" fill="#dfd3ae" stroke="#64563e" stroke-width="1"/>':''}</g><text x="${x}" y="530" text-anchor="middle">${names[id]}</text><text x="${x}" y="558" text-anchor="middle" font-size="18">${duties[id]}</text>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" role="img" aria-label="员工合影：${ids.map(id=>names[id]).join('、')}"><rect width="900" height="600" fill="#cdbd92"/><rect x="24" y="24" width="852" height="552" fill="#728f87"/><path d="M24 410h852v166H24z" fill="#a89973"/><path d="M24 115h852M24 215h852M24 315h852" stroke="#566f69" stroke-width="3" opacity=".5"/><circle cx="450" cy="210" r="92" fill="#426975" stroke="#b6ba9b" stroke-width="12"/><path d="M389 210h122m-61-61v122" stroke="#b6ba9b" stroke-width="7"/><text x="450" y="82" text-anchor="middle" fill="#f1e5c3" font-family="Microsoft YaHei, sans-serif" font-size="30" letter-spacing="6">蟹堡王 · 员工合影</text><g fill="#273c39" font-family="Microsoft YaHei, sans-serif" font-size="25">${people}</g><rect x="24" y="24" width="852" height="552" fill="none" stroke="#e0d0a5" stroke-width="4"/></svg>`;
}
// 原创矢量分镜：正面室内构图、细墨线、有限色块；角色直接参与动作。
function memoryIllustration(index){
  const warm=index===3,ink='#282820';
  const room=`<path fill="${warm?'#aaa087':'#929c89'}" d="M0 0h960v500H0z"/>
    <path fill="#777c68" d="M0 324h960v176H0z"/><path fill="#a29478" d="M0 382h960v118H0z"/>
    <g fill="none" stroke="${ink}" stroke-width="2"><path d="M0 324h960M0 338h960M0 382h960M0 447h960M170 382l-52 118m274-118-17 118m238-118 26 118m188-118 68 118"/>
    <path d="m725 0-6 28 13 13-8 35m8-35 17 4M55 299l33-5 12 8m655 11 35 2" stroke="#6d7363"/></g>
    <g stroke="${ink}" stroke-width="2.2"><path fill="#706e5b" d="M62 47h254v245H62z"/><path fill="#53686a" d="M73 58h232v223H73z"/>
    <path fill="#798d87" d="M73 216q61-27 118-15t114-12v92H73z" stroke="none"/><path fill="#bbb299" d="M185 58h8v223h-8zM73 163h232v8H73z"/>
    <path fill="#918970" d="M54 289h270v12H54z"/></g>
    <g stroke="${ink}" stroke-width="2"><circle cx="791" cy="113" r="48" fill="#817e65"/><circle cx="791" cy="113" r="40" fill="#c8bfa2"/>
    <path d="M791 79v6m34 28h-6m-28 34v-6m-34-28h6m28 0-3-23m3 23-19 9" fill="none"/><circle cx="791" cy="113" r="3" fill="${ink}"/></g>`;
  const table=`<g stroke="${ink}" stroke-width="2.4"><path fill="#686653" d="M516 355h23v131h-23z"/><path fill="#686653" d="m494 486 33-12 35 12v7h-68z"/>
    <path fill="#8d735b" d="M327 332h408v23H327z"/><ellipse cx="531" cy="332" rx="204" ry="31" fill="#b99e7c"/>
    <path d="M360 338q83 16 163 17m49-1 121-14" fill="none" stroke="#806c56" stroke-width="1.5"/></g>`;
  const plate=`<g stroke="${ink}" stroke-width="2"><ellipse cx="527" cy="320" rx="78" ry="16" fill="#d6cfb6"/><ellipse cx="527" cy="318" rx="61" ry="10" fill="none"/>
    <path fill="#a48555" d="M483 304h89v12q-44 13-89 0z"/><path fill="#7b694e" d="M481 298h92v9h-92z"/><path fill="#8a9063" d="m480 297 9-7 11 5 14-6 12 5 15-4 13 6 18-5v7z"/>
    <path fill="#b89c68" d="M483 289c3-39 84-39 89 0v4h-89z"/><path d="m508 275 4 2m13-6 4 1m13 3 4-1m-28 10 4-1" fill="none" stroke="#ded0a5"/></g>`;
  const chair=`<g stroke="${ink}" stroke-width="2.4"><path fill="#797557" d="M747 244h128v171H747z"/><path fill="#a39774" d="M757 256h108v91H757z"/>
    <path d="M765 363v126m91-126v126" fill="none" stroke-width="8"/><path fill="#97906b" d="M736 351h150v20H736z"/></g>`;
  const patrick=`<g stroke="${ink}" stroke-width="2.4" stroke-linejoin="round"><path fill="#b89583" d="M158 327c-10-55-7-80 15-112l30-47 24-101q5-17 12 1l28 106c17 20 29 42 39 67l72 28q13 5 5 12l-72 2c8 22 10 36 8 48z"/>
    <path fill="#a5a075" d="M156 316q76 14 164 0l-1 65-62 3-18-29-17 30-61-4z"/><path fill="#897b88" d="m169 343 17-11 17 18-15 17zm105 0 16-12 15 20-16 15z"/>
    <path fill="#b89583" d="m166 380 4 50h46l8-45m36-2 8 47h42l3-49"/><path d="m182 430-19 5m126-5 18 5" fill="none"/>
    <ellipse cx="229" cy="184" rx="14" ry="22" fill="#d5d0b7"/><ellipse cx="257" cy="185" rx="13" ry="21" fill="#d5d0b7"/>
    <path fill="#9f8b79" d="M215 178q14-13 28 0m2 1q13-12 25 0"/><ellipse cx="235" cy="188" rx="2.7" ry="5" fill="${ink}"/><ellipse cx="261" cy="189" rx="2.6" ry="5" fill="${ink}"/>
    <path d="M224 224q16-3 32 0m-39-23 12 3m19 1 14-3M206 258q13 12 37 8" fill="none"/><circle cx="237" cy="295" r="2" fill="${ink}"/>
    <path fill="#b89583" d="m160 247-40 49q-4 11 8 10l53-31"/><path d="m346 278 18-4" fill="none"/></g>`;
  const squid=`<g stroke="${ink}" stroke-width="2.3" stroke-linejoin="round"><path fill="#909d89" d="M574 157c-24-28-20-71 10-92 31-21 81-17 99 13 22 36 4 66-20 80l-1 36h-62l-1-33z"/>
    <path fill="#c7c2a4" d="M591 107q15-8 28 0v36q-13 10-25-1zM628 107q15-8 27 1v35q-12 10-25-1z"/>
    <path fill="#9d9d81" d="M591 107h28v18h-28zm37 1h27v17h-27z"/><path d="M591 124h28m9 1h27m-29-61 4 12m-17-11 4 11" fill="none"/>
    <path fill="#909d89" d="M616 124q12-7 16 0l16 52q-16 17-37 0z"/><ellipse cx="609" cy="132" rx="2.5" ry="4" fill="#704f3c"/><ellipse cx="643" cy="132" rx="2.5" ry="4" fill="#704f3c"/>
    <path d="M603 183h45m-41 5h36" fill="none"/><path fill="#8e7855" d="m597 193-35 27 16 38 19-10-8 96h88l-12-97 18 8 13-38-35-24-25 15z"/>
    <path d="m605 198 24 13 25-14m-25 14v96" fill="none"/><circle cx="640" cy="274" r="2" fill="${ink}"/>
    <path fill="#909d89" d="M573 248q-26 27-69 37l-6 9q52-3 91-36zM676 249l30 46-24 49-10-5 17-46-25-31z"/>
    <path fill="#909d89" d="M600 344h18l-8 79-20 24-19-1q-4-8 15-11zm38 0h18l7 92 22 4q9 12-12 11l-27-8z"/>
    <path d="m601 351-17 64-20 15m83-81 23 60 17 13" fill="none" stroke-width="5"/>
    <path fill="#34362f" d="M682 285h10v97h-10zM678 379h18l13 23h-44z"/><path d="M679 318h16m-16 20h16m-16 21h16" stroke="#b0a17c" fill="none"/></g>`;
  const sponge=`<g stroke="${ink}" stroke-width="2.4" stroke-linejoin="round"><path fill="#b9ab68" d="m177 84 18-6 17 4 20-4 16 5 18-2 19 5 16-3 15 6-3 19 4 19-5 18 4 21-3 21 4 18-4 18H179l-4-21 3-21-4-18 5-21-4-16 4-21z"/>
    <g fill="#8e8650" stroke-width="1.4"><ellipse cx="190" cy="103" rx="6" ry="8"/><ellipse cx="292" cy="112" rx="7" ry="5"/><ellipse cx="192" cy="191" rx="5" ry="7"/><ellipse cx="293" cy="187" rx="6" ry="9"/><circle cx="270" cy="94" r="3"/></g>
    <ellipse cx="222" cy="133" rx="21" ry="27" fill="#ddd6bb"/><ellipse cx="268" cy="133" rx="21" ry="27" fill="#ddd6bb"/>
    <path fill="#aaa076" d="M203 125q17-17 39 0m6 0q19-18 39 0"/><path fill="#91825d" stroke="none" d="M202 157q19 23 40 0v7q-23 19-40-2zm45 0q20 23 40 0v6q-20 20-40 1z"/>
    <g fill="#738981"><ellipse cx="228" cy="139" rx="7" ry="9"/><ellipse cx="274" cy="139" rx="7" ry="9"/></g><g fill="${ink}"><ellipse cx="230" cy="140" rx="2" ry="4"/><ellipse cx="275" cy="140" rx="2" ry="4"/></g>
    <path fill="#b9ab68" d="M242 137q22-4 23 8t-23 10z"/><path d="M223 186q21-4 44 0m-62-77-4-7m15 3-1-8m58 9 4-8" fill="none"/>
    <path fill="#d4ccb2" d="M179 222h134v28H179z"/><path fill="#77624c" d="M179 250h134v42H179z"/><path fill="#98654e" d="m238 232 9 12 8-12-4 34h-9z"/>
    <path d="m208 222 30 10-11 12zm48 10 26-10-12 22zM192 271h30m45 0h30" fill="none"/>
    <path fill="#d4ccb2" d="m178 226-24 8 8 21 17-5m133-24 24 8-8 21-16-5"/>
    <path fill="#b9ab68" d="m165 254-9 60 36 22 5-10-27-17 10-54zm160 0 23 37 38 2 4 12-50 3-26-43z"/>
    <path fill="#b9ab68" d="M207 292h10v98h-10zm63 0h10v98h-10z"/><path fill="#d4ccb2" d="M204 363h16v42h-16zm63 0h16v42h-16z"/>
    <path fill="#34362f" d="m202 402 19 1 12 17h-44q-5-13 13-18zm64 1 17-1q25 6 23 18h-40z"/></g>`;
  const note=`<g stroke="${ink}" stroke-width="1.7"><path fill="#ded1ad" d="m599 305 74-9 4 27-76 8z"/><path d="m611 310 47-5m-46 11 33-4" fill="none"/></g>`;
  const scenes=[
    `${patrick}${chair}${table}${plate}${note}<g stroke="${ink}" stroke-width="2"><path fill="#a8a58f" d="M378 312q0-47 52-47t52 47z"/><ellipse cx="430" cy="263" rx="9" ry="5" fill="#8e8b74"/></g>`,
    `<g stroke="${ink}" stroke-width="2.2"><path fill="#695f4e" d="M312 288h210v20H312zm14 20h13v132h-13zm168 0h13v132h-13z"/><path fill="#858671" d="M340 201h157v82H340z"/><path fill="#aeaa88" d="M350 213h104v34H350z"/><path d="M360 234h82m-61-12v9m10-9v9m10-9v9m10-9v9m10-9v9" fill="none"/><circle cx="478" cy="229" r="11" fill="#a79a75"/><path d="m478 229-6-5" fill="none"/><path d="M353 259h101m-101 5h101m-101 5h101" fill="none" stroke-width="1.4"/></g>${squid}<g stroke="${ink}" stroke-width="1.5"><path fill="#ded1ad" d="m366 285 51-3 3 12-52 4zm55-1 51-3 3 12-52 4z"/><path d="m373 288 35-2m11-50h7" fill="none"/></g>`,
    `${sponge}<g stroke="${ink}" stroke-width="2.4"><path fill="#9a9278" d="M110 337h708v163H110z"/><path fill="#bec0a2" d="M92 320h744v21H92z"/><path d="M132 375h662m-471 0v125m253-125v125" fill="none"/><path fill="#696e5b" d="M245 389h39v7h-39zm205 0h39v7h-39zm205 0h39v7h-39z"/></g>${plate}<g stroke="${ink}" stroke-width="1.8"><path fill="#ded1ad" d="m369 296 75-12 12 39-75 12z"/><path d="m385 297 43-6m-41 15 45-7m-42 15 26-4" fill="none"/></g>`,
    `${chair}${table}${plate}${note}<g stroke="${ink}" stroke-width="2.4"><path fill="#8b7954" d="M676 176h8v140h-8z"/><ellipse cx="680" cy="318" rx="30" ry="7" fill="#8b7954"/><path fill="#c6b888" d="m649 163 14-54h34l16 54z"/><path d="M659 152h43" fill="none" stroke="#a79770"/></g>`
  ];
  return `<svg xmlns="http://www.w3.org/2000/svg" class="memory-art" viewBox="0 0 960 500" role="img" aria-label="${['派大星在四号桌留了半份饭','章鱼哥关掉广播，留下短曲','海绵宝宝把第一份配方交给你','四号桌的饭与暖灯','无人坐下的四号桌与保温罩'][index]||'夜班回忆'}">${room}${index===4?chair+table+plate+'<g fill="#969a80" stroke="#282820" stroke-width="2.4"><path d="M459 313q1-60 68-63 68 3 68 63z"/><path d="M515 249v-10h24v10" fill="none"/></g>':scenes[index]||scenes[3]}</svg>`;
}
function itemIcon(id) {
  const p={officeKey:'<circle cx="15" cy="14" r="10"/><circle cx="15" cy="14" r="5"/><path d="m22 22 18 18m-11-11 5-5m0 10 5-5"/>',warehouseKey:'<path d="M7 5h19v17H7zM14 11h5v5h-5zM17 22v22h17v-6h-7v-6h7v-6H17"/>',tap:'<path d="M7 22h28v8h-6v8h-8V30H7zM18 14h10M23 8v14M34 42q-4 8-8 0l4-6z"/>',key:'<circle cx="16" cy="17" r="9"/><path d="m23 24 18 18m-8-8 5-5m0 10 5-5"/>',pot:'<path d="M9 20h30v20H9zm-6 5h6m30 0h6M14 14h20M24 10v4"/>',ice:'<path d="m24 5 18 11v20L24 46 6 36V16zm-18 11 18 11 18-11M24 27v19"/><path d="m15 21 11-4 10 8-9 11-12-7z"/>',cube:'<path fill="currentColor" d="m24 6 17 10v20L24 45 7 36V16z"/><path stroke="#d2ac74" d="m7 16 17 10 17-10M24 26v19"/>',cashier:'<path d="M8 19h32v23H8zm4-13h24v13H12zM16 30h2m6 0h2m6 0h2M12 38h24"/>',office:'<path d="M7 6h34v37H7zm6 7h22v23H13z"/><circle cx="24" cy="25" r="7"/><path d="M24 21v8m-4-4h8"/>',kitchen:'<path d="m13 5 22 4-5 20-8-2-4 17-7-2 4-17-7-2zM17 11l-2 8m8-7-2 8m8-7-2 8"/>'};
  return `<svg viewBox="0 0 48 48" aria-hidden="true"><g fill="none" stroke="${id==='officeKey'?'#c5a261':id==='warehouseKey'?'#a9b2ae':'currentColor'}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">${p[id]||p.cube}</g></svg>`;
}
function musicFragment(piece){
  const left=piece===1?'6 6,6 86':piece===2?'6 6,1 25,15 35,0 44,12 58,4 72,6 86':'6 6,6 28,-3 38,6 48,6 86';
  const right=piece===1?'130 86,128 72,136 58,124 44,139 35,125 25,130 6':piece===2?'130 86,130 48,121 38,130 28,130 6':'130 86,130 6';
  const notes=piece===1?[[37,53],[65,45],[93,37]]:piece===2?[[36,37],[66,45],[98,53]]:[[39,53],[67,61],[97,61]];
  return `<svg class="music-piece-art" viewBox="-5 0 150 92" aria-hidden="true"><polygon points="${left},${right}" fill="#d9cba5" stroke="#3a382b" stroke-width="1.6"/><g fill="none" stroke="#706651" stroke-width=".9">${[29,37,45,53,61].map(y=>`<path d="M17 ${y}h104"/>`).join('')}</g><g fill="#39382c" stroke="#39382c" stroke-width="1.4">${notes.map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="4" ry="2.8" transform="rotate(-15 ${x} ${y})"/><path d="M${x+4} ${y}v-20"/>`).join('')}${piece===1?'<path d="M18 27v36m5-36v36" fill="none"/>':piece===3?'<path d="M114 27v36m6-36v36" stroke-width="2" fill="none"/>':''}</g></svg>`;
}

window.KrustyArt={KITCHEN_OBJECTS,DRAWER_CONTENTS,kitchenObject,portrait,employeePhoto,memoryIllustration,itemIcon,musicFragment};
})();