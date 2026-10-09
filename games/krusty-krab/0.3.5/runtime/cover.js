(function(){
"use strict";
// 封面是独立分层插画。影子先挥手，人物仍在擦柜台；不用视频或联网资源。
function coverIllustration(){
  return `<svg id="coverArt" viewBox="0 0 1440 960" preserveAspectRatio="xMaxYMid slice" role="img" aria-labelledby="coverDescription" xmlns="http://www.w3.org/2000/svg">
  <title id="coverDescription">疲惫的海绵宝宝在老餐厅擦柜台，墙上的影子先向你挥手。</title>
  <defs>
    <linearGradient id="coverWall" x2="1" y2=".4"><stop stop-color="#152c2c"/><stop offset=".63" stop-color="#34524c"/><stop offset="1" stop-color="#354850"/></linearGradient>
    <linearGradient id="coverNight" x2="0" y2="1"><stop stop-color="#493c6d"/><stop offset=".52" stop-color="#bc6d91"/><stop offset=".8" stop-color="#cb8292"/><stop offset="1" stop-color="#365564"/></linearGradient>
    <linearGradient id="coverWood" x2="0" y2="1"><stop stop-color="#745347"/><stop offset="1" stop-color="#322d29"/></linearGradient>
    <linearGradient id="coverSponge" x2="1" y2=".3"><stop stop-color="#aaa05c"/><stop offset=".52" stop-color="#c7b66b"/><stop offset="1" stop-color="#aaa060"/></linearGradient>
    <linearGradient id="coverEyeBag" x2="0" y2="1"><stop stop-color="#827764" stop-opacity=".32"/><stop offset=".65" stop-color="#6c606a" stop-opacity=".58"/><stop offset="1" stop-color="#857c66" stop-opacity=".2"/></linearGradient>
    <radialGradient id="coverCityGlow"><stop stop-color="#c980a6" stop-opacity=".2"/><stop offset="1" stop-color="#c980a6" stop-opacity="0"/></radialGradient>
    <radialGradient id="coverGlow"><stop stop-color="#dabc8050"/><stop offset="1" stop-color="#dabc8000"/></radialGradient>
    <filter id="coverGrain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".55" numOctaves="3" seed="17"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope=".13"/></feComponentTransfer><feBlend in="SourceGraphic" mode="soft-light"/></filter>
    <filter id="coverShadowSoft"><feGaussianBlur stdDeviation="2.1"/></filter>
  </defs>
  <g filter="url(#coverGrain)">
    <path fill="url(#coverWall)" d="M0 0h1440v960H0z"/>
    <ellipse id="coverLampGlow" cx="1035" cy="385" rx="405" ry="480" fill="url(#coverGlow)"/>
    <ellipse cx="1360" cy="420" rx="460" ry="410" fill="url(#coverCityGlow)"/>
    <!-- 老墙只留少量裂纹与褪色痕迹，不堆道具。 -->
    <g fill="none" stroke="#182f2e" stroke-width="2" opacity=".6"><path d="M792 0l-5 84 14 21-10 39 9 12m-10-51-24 11"/><path d="M1391 602l-18 33 6 34-15 21m15-21 16 8"/><path d="M48 659l22-20 6-31"/></g>
    <path d="M0 660h1440v10H0z" fill="#192f2b" opacity=".4"/>
    <!-- 一只停在午夜前的旧钟，留在标题和人物之间的空墙上。 -->
    <g id="coverWallClock" transform="translate(702 278)" stroke="#273d37" stroke-linecap="round">
      <circle cx="4" cy="5" r="46" fill="#152b2a" stroke="none" opacity=".38"/>
      <circle r="46" fill="#697768" stroke-width="4"/>
      <circle r="39" fill="#b3ad8a" stroke="#8a8c6c" stroke-width="2"/>
      <path d="M0-32v5M16-28l-2 4M28-16l-4 2M32 0h-5M28 16l-4-2M16 28l-2-4M0 32v-5M-16 28l2-4M-28 16l4-2M-32 0h5M-28-16l4 2M-16-28l2 4" fill="none" stroke="#626e58" stroke-width="2"/>
      <path d="M0 2-4-20M0 2-3-30" fill="none" stroke="#394b41" stroke-width="2.3"/>
      <circle cy="2" r="3" fill="#394b41" stroke="none"/>
      <path d="m-27-18 13 6-4 13 10 7m-10-7-11 4" fill="none" stroke="#8e9278" stroke-width="1" opacity=".55"/>
    </g>
    <!-- 夕阳、棕榈和低矮城市仍只占一个窗景。 -->
    <g stroke="#152728" stroke-width="8">
      <path d="M1280 230l144-5v372l-144 8z" fill="#4d655e"/>
      <path d="M1295 246l113-3v338l-113 8z" fill="url(#coverNight)"/>
    </g>
    <circle cx="1359" cy="351" r="48" fill="#e8aaae" opacity=".68"/>
    <g stroke="#ac728c" stroke-width="3" opacity=".65"><path d="M1316 366h86m-80 11h72m-62 10h52"/></g>
    <path d="M1295 547h14v-30h18v30h11v-48h19v48h13v-34h20v34h18v34l-113 8z" fill="#35415a"/>
    <path d="M1295 548h113" stroke="#d780a6" stroke-width="4"/>
    <path d="M1337 580q9-90 0-160l-7-7q-13 50-23 59 2-47 20-61-30 2-37 14 8-31 38-26-8-26-25-30 33-8 39 23 20-24 42-14-28 9-34 27 33-2 42 25-22-15-38-11 23 20 21 44-14-19-31-29l7 146z" fill="#22333f"/>
    <path d="M1295 397l113-2" fill="none" stroke="#576c6a" stroke-width="7"/>
    <path d="M1287 242v348m128-347v345" stroke="#80b7aa" stroke-width="3" opacity=".7"/>
    <path d="M1291 244l118-2" stroke="#cf8dab" stroke-width="3" opacity=".8"/>
    <path d="M1301 272q2 26-1 43m6 118-1 40m92-202-2 48m-6 147-1 28" fill="none" stroke="#b0bfb1" stroke-width="1.5" opacity=".28"/>
    <!-- 唯一异常：与人物分开的方形影子，手臂有自己的时间。 -->
    <g id="coverShadow" fill="#101e23" opacity=".51" filter="url(#coverShadowSoft)">
      <path d="M1001 217l-5-54 93-32 65 9 29 53 70 19-7 237-14 190-212-1-20-173z"/>
      <!-- 衣服、裤子与腿连续向下投影；柜台在前景遮住腿，不让影子悬在墙上。 -->
      <path d="m1020 622 215 1-8 95 8 103-83 4-37-5-78 2-15-102z"/>
      <path d="m1057 813 58 1 4 119-8 17-74 1q-8-17 9-23l10-5zm115 1 54-2 1 112 23 12q13 17-9 19l-73-5z"/>
      <path d="M1240 421q47 73 22 154l-45 85-21-10 44-93q9-57-26-113z"/>
      <g id="coverShadowArm">
        <path d="M1008 426q-9 27-42 56l-38 27-10-18 34-34q25-25 31-46z"/>
        <path d="M934 493q-4-16-15-17l-16 4-18-9q-8 1-4 8l15 12-23 3q-8 5-1 10l26-2-19 13q-6 8 3 9l22-13-7 14q0 9 7 6l15-22 10 4z"/>
      </g>
    </g>
    <g stroke="#26312b" stroke-linejoin="round" stroke-linecap="round">
      <!-- 身体与手分层，动作不带动餐厅背景。 -->
      <g id="coverEmployee">
        <path d="M909 623q-25 5-32 43l41 23 26-49zm254-1q27 8 35 42l-34 24-29-47z" fill="#c4c2a8" stroke-width="4"/>
        <path d="M917 613l253-1-7 79-234 3z" fill="#d2cbb0" stroke-width="4"/>
        <path d="M929 681h234l4 73H927z" fill="#705445" stroke-width="4"/>
        <path d="M931 704h41m27 0h41m30 0h41m27 0h26" fill="none" stroke-width="7"/>
        <path d="m991 617 39 37 28-37 27 35 36-34" fill="none" stroke-width="3"/>
        <path d="m1040 623 25 1-3 27-20 1zM1044 651l17-1 12 53-22 18-24-17z" fill="#9d5056" stroke-width="3"/>
        <g id="coverHead">
          <path d="M890 351q13-10 31-4l35-3 40 5 34-7 41 7 40-5 37 6 39-5 18 18-4 36 5 35-6 35 4 34-6 36 5 31-10 33 1 33-15 20-42-4-38 7-40-5-42 5-39-6-43 3-31-5-8-30 5-33-6-36 6-31-5-38 4-31-5-38z" fill="url(#coverSponge)" stroke-width="4"/>
          <!-- 褪色与眼下浮肿保持宽方形的原角色比例。 -->
          <g stroke="none"><path d="M894 466q30 25 37 71l-11 42 28 26-35 6-18-18-5-48z" fill="#8d9258" opacity=".34"/><path d="M1174 426q-21 69-15 114l-9 51 28 18 23-33-3-70z" fill="#858a57" opacity=".3"/><path d="M979 584q55-7 132 4l36 18-69 8-84-4z" fill="#929158" opacity=".26"/></g>
          <g fill="#838653" opacity=".72" stroke="none"><ellipse cx="916" cy="374" rx="13" ry="16"/><ellipse cx="1182" cy="388" rx="10" ry="15"/><ellipse cx="911" cy="488" rx="8" ry="11"/><ellipse cx="1158" cy="585" rx="13" ry="16"/><ellipse cx="915" cy="582" rx="12" ry="17"/><ellipse cx="965" cy="604" rx="8" ry="6"/><ellipse cx="1121" cy="364" rx="7" ry="5"/><ellipse cx="1186" cy="484" rx="8" ry="12"/></g>
          <g fill="none" stroke="#d1c181" stroke-width="2" opacity=".4"><path d="M905 369q6-11 15-10m252 19q7-9 15-6m-287 202q5-12 16-10m231 14q5-8 14-6"/></g>
          <!-- 眼袋沿眼底弯曲，鼻梁两侧留出皮肤，不把两只眼睛连成面罩。 -->
          <g stroke="none" fill="url(#coverEyeBag)"><path d="M936 480q10 29 38 36 34 10 66-16-3 33-36 36-43 9-62-19z"/><path d="M1064 500q29 26 60 16 29-7 43-36-3 39-29 51-43 17-68-8z"/></g>
          <path d="M948 518q38 30 81 5m44 0q42 30 80-5" fill="none" stroke="#857762" stroke-width="2" opacity=".3"/>
          <ellipse cx="993" cy="454" rx="55" ry="60" fill="#dad5bb" stroke="#655b4c" stroke-width="3"/>
          <ellipse cx="1107" cy="454" rx="55" ry="60" fill="#dad5bb" stroke="#655b4c" stroke-width="3"/>
          <g id="coverEyes"><g fill="#668b8c" stroke="#3b565b" stroke-width="2"><circle cx="1000" cy="467" r="23"/><circle cx="1100" cy="467" r="23"/></g><g fill="none" stroke="#879b95" stroke-width="2" opacity=".7"><path d="m984 459 5 3m6-12 2 6m16-1-4 5m-22 20 5-5m116-17-5 4m-4-13-1 6m-13-1 4 5m22 20-5-5"/></g><g fill="#253336" stroke="none"><ellipse cx="1000" cy="468" rx="12" ry="15"/><ellipse cx="1100" cy="468" rx="12" ry="15"/></g><g fill="#c8c9b0" stroke="none" opacity=".45"><circle cx="1007" cy="460" r="2"/><circle cx="1107" cy="460" r="2"/></g></g>
          <!-- 泛黄眼白、红丝与下垂眼皮一起表达长期失眠。 -->
          <g fill="none" stroke="#a58178" stroke-width="1.5" opacity=".5"><path d="m943 472 12-3 4-7m-6 7 4 9m75-11-9 5 1 8m87-13 13 5 6-4m-8 4-4 8m44-11-11 3-3-7"/></g>
          <path d="M938 439q10-45 54-45 44 0 56 46l-54-7zM1052 441q9-47 55-47 45 0 55 46l-55-6z" fill="#b3aa73" stroke="#675d46" stroke-width="3"/>
          <path d="M941 435q43-7 102 3m12 0q49-7 103-2" fill="none" stroke="#817853" stroke-width="2"/>
          <path d="m971 397-6-16m25 10-1-17m24 21 6-14m65 16-5-15m25 10 1-16m22 22 7-14" fill="none" stroke-width="4"/>
          <path d="M1040 482q22-13 39-3 15 11 0 23-12 7-35 5z" fill="#c2b16a" stroke="none"/>
          <path d="M1040 482q22-13 39-3 15 11 0 23-12 7-30 4" fill="none" stroke="#655c42" stroke-width="2.5"/>
          <path d="m1191 390-3 43m5 50-5 53" fill="none" stroke="#bca08b" stroke-width="3" opacity=".55"/>
          <path d="m896 402 2 36m-2 79 4 32" fill="none" stroke="#78a497" stroke-width="3" opacity=".5"/>
          <path d="M963 549q83 25 171-1" fill="none" stroke="#55503c" stroke-width="3"/>
          <path d="M1027 561h20v24h-20zm24 0h20v24h-20z" fill="#d9d1ad" stroke-width="2"/>
          <path d="M948 551q-2-21 16-23m169-1q18 4 16 24" fill="none" stroke="#8d8454" stroke-width="2"/>
          <path d="M941 546q-2 16 8 22m201-22q3 17-8 23" fill="none" stroke="#949059" stroke-width="2"/>
          <g fill="#958050" stroke="none" opacity=".65"><circle cx="957" cy="535" r="2"/><circle cx="966" cy="540" r="2"/><circle cx="1140" cy="535" r="2"/><circle cx="1131" cy="540" r="2"/></g>
          <path d="M998 334q-5-38 16-65 11-16 40-18 40 1 49 38l-2 47z" fill="#c6c5b1" stroke-width="4"/>
          <path d="M994 323q56-17 108 1l-3 16-101-1z" fill="#3b5962" stroke-width="3"/>
          <path d="M1054 271v33m-10-16h20m-23 7q13 20 28-1m-29 0 0 7m29-7-1 8" fill="none" stroke="#52716f" stroke-width="3"/>
        </g>
      </g>
      <!-- 木柜台遮住身体，抹布与手留在柜面上。 -->
      <path d="M0 792l1440-7v175H0z" fill="url(#coverWood)" stroke-width="5"/>
      <path id="coverCounterTop" d="M0 746l1440-7v46L0 792z" fill="#806052" stroke-width="4"/>
      <path d="M0 794l1440-7v12L0 806z" fill="#584038" stroke="none"/>
      <g fill="none" stroke="#402e2c" stroke-width="2" opacity=".7"><path d="M0 807l1440-11M0 889l1440-8M336 807l-4 77m457-83-2 82m438-86 3 84"/><path d="m83 757 296-4m182 5 259-4m322 2 184-6"/><path d="M910 853q58-18 110-3m-76 11 49-4"/></g>
      <g id="coverWipe" stroke-width="3">
        <path d="M991 751C1023 749 1064 752 1100 752C1104 753 1106 763 1110 772Q1113 776 1106 777C1070 780 1024 777 987 777Q983 776 987 770L990 764Q983 755 991 751Z" fill="#9eaaa0" stroke="#5e7166" stroke-width="1.7"/>
        <path d="M1088 755Q1090 767 1097 774M993 771Q1037 775 1084 774" fill="none" stroke="#74887b" stroke-width="1.3"/>
      </g>
      <!-- 前臂在布上方伸缩，掌心压住布；三个层次始终保持接触。 -->
      <path id="coverForearm" d="M905 742C922 741 943 748 964 749L1017 750L1015 766C983 764 958 759 933 756C919 755 909 750 905 742Z" fill="#c3b16b" stroke="#655f43" stroke-width="2.2"/>
      <!-- 弯肘跨过柜台后沿，固定上臂覆盖前臂接缝；轮廓不画内部断线。 -->
      <path id="coverLeftUpperArm" d="M896 677C891 692 889 712 893 726C893 738 900 747 912 751C918 754 926 756 935 757L937 745C925 744 918 740 918 731C917 713 916 696 915 681Z" fill="#c3b16b" stroke="none"/>
      <path d="M915 681L896 677C891 692 889 712 893 726C893 738 900 747 912 751C918 754 926 756 935 757M937 745C925 744 918 740 918 731C917 713 916 696 915 681" fill="none" stroke="#655f43" stroke-width="2.2"/>
      <g id="coverWipeHand" stroke="#655f43" stroke-width="1.8">
        <!-- 圆润的指尖与拇指分开，腕部覆盖前臂端线，避免硬折角。 -->
        <path id="coverPalm" d="M1006 750C1013 749 1018 744 1025 744C1032 744 1035 747 1040 749L1059 750C1065 750 1068 752 1067 754C1066 757 1062 756 1059 756L1041 755L1062 759C1068 760 1070 762 1068 765C1067 767 1064 767 1060 766L1039 762L1058 769C1063 770 1064 773 1061 775C1059 777 1056 776 1053 775L1034 768C1031 767 1028 766 1025 766C1028 770 1035 773 1035 777C1035 781 1031 781 1028 779L1017 771C1013 768 1010 766 1007 765C1008 760 1009 755 1006 750Z" fill="#c3b16b"/>
        <path d="M1021 751Q1027 749 1032 752M1019 761Q1021 763 1025 764" fill="none" stroke="#9b8b53" stroke-width="1.1"/>
      </g>
      <g id="coverRestHand" stroke="#655f43" stroke-width="1.8">
        <path id="coverRightArm" d="M1172 678C1170 695 1167 715 1166 731C1165 738 1169 748 1167 754C1165 758 1161 760 1154 762L1158 768C1172 764 1181 755 1184 746C1189 740 1187 728 1190 710L1195 678Z" fill="#c3b16b" stroke-width="2.2"/>
        <path d="M1165 755C1161 754 1157 755 1154 757C1151 758 1149 756 1146 755C1142 753 1138 754 1138 757C1138 760 1143 762 1145 763L1138 765C1134 766 1133 769 1136 771C1138 773 1142 772 1144 772L1139 775C1135 777 1137 780 1141 780C1147 780 1152 776 1157 776C1163 775 1168 770 1171 766C1170 762 1167 758 1165 755Z" fill="#c3b16b"/>
        <path d="M1144 766Q1150 767 1156 764M1147 772Q1153 773 1159 769" fill="none" stroke="#9b8b53" stroke-width="1.1"/>
      </g>
    </g>
    <!-- 黑方块成为灯罩的轮廓，保留单盏灯的安静构图。 -->
    <path d="M1050 0v170" stroke="#172d2b" stroke-width="5"/>
    <g id="coverCubeLamp" transform="translate(315 122) scale(.7)">
      <g stroke="#243732" stroke-width="3" stroke-linejoin="round"><path d="m1003 84 49-16 49 20-45 18z" fill="#25302f"/><path d="m1003 84 53 22v61l-53-22z" fill="#1d2929"/><path d="m1056 106 45-18v61l-45 18z" fill="#101f22"/></g>
      <path d="m1006 144 49 20 43-16" fill="none" stroke="#c7b485" stroke-width="3"/>
      <path d="m1008 85 44-14 43 18" fill="none" stroke="#70857b" stroke-width="1.5" opacity=".65"/>
    </g>
  </g>
  </svg>`;
}

window.KrustyCover={coverIllustration};
})();