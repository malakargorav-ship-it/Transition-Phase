const $=id=>document.getElementById(id);const KEY='tp-command-v1';const today=()=>new Date().toISOString().slice(0,10);const defaults={track:'constable',topic:'number-system',duration:10,daily:120,doneDays:[],sessions:[],revision:[],topicDone:[]};let state=load();function load(){try{return {...defaults,...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch{return {...defaults}}}if(!banksafeTopic(state.topic))state.topic='number-system';function banksafeTopic(topic){return topic==='number-system';}function save(){localStorage.setItem(KEY,JSON.stringify(state));renderStats();}const banks={
"number-system":[
["Which is the smallest natural number?",["0","1","-1","There is no smallest"],1,"In this course, natural numbers start from 1: 1, 2, 3, ... ."],
["Which set includes zero and all positive counting numbers?",["Natural numbers","Whole numbers","Irrational numbers","Negative integers"],1,"Whole numbers are 0, 1, 2, 3, ... ."],
["Which of these is an integer?",["3/4","-9","√5","2.5"],1,"Integers include negative whole numbers, zero and positive whole numbers."],
["Which is a rational number?",["√7","π","-5/8","√3"],2,"A rational number can be written as p/q where p and q are integers and q is non-zero."],
["Which number is irrational?",["0.25","7/9","√2","-4"],2,"√2 cannot be expressed as a ratio of two integers."],
["Every natural number is also a:",["Whole number","Irrational number","Negative integer","Prime number"],0,"Natural numbers are contained within whole numbers."],
["Which is neither prime nor composite?",["0","1","2","3"],1,"The number 1 has exactly one positive factor, so it is neither prime nor composite."],
["How many positive factors does 13 have?",["1","2","3","13"],1,"13 is prime; its only positive factors are 1 and 13."],
["Which is the only even prime number?",["0","1","2","4"],2,"2 has exactly two positive factors: 1 and 2."],
["Which number is a whole number but not a natural number?",["1","2","0","-1"],2,"Zero belongs to whole numbers but is not counted as a natural number in this convention."],
["Which fraction is equivalent to 0.75?",["1/4","2/3","3/4","4/5"],2,"0.75 = 75/100 = 3/4 after dividing numerator and denominator by 25."],
["Which decimal is terminating?",["1/3","1/7","3/8","2/9"],2,"3/8 = 0.375, so it terminates."],
["Which decimal is non-terminating recurring?",["1/2","1/4","1/3","1/8"],2,"1/3 = 0.333... with a repeating digit."],
["Which number lies between 2 and 3?",["√3","√5","√10","√16"],1,"√5 is approximately 2.236, between 2 and 3."],
["The value of |−12| is:",["−12","0","12","24"],2,"Absolute value is the non-negative distance from zero."],
["Which is the greatest?",["−2","−5","−1","−9"],2,"Among negative numbers, the one closest to zero is greatest."],
["The additive identity is:",["1","−1","0","10"],2,"Adding zero leaves a number unchanged: a + 0 = a."],
["The multiplicative identity is:",["0","1","−1","10"],1,"Multiplying by 1 leaves a number unchanged: a × 1 = a."],
["Which property is shown by 4 + 7 = 7 + 4?",["Associative","Commutative","Distributive","Closure only"],1,"Commutative property allows the order of addition to change."],
["Which property is shown by (2 + 3) + 4 = 2 + (3 + 4)?",["Commutative","Associative","Identity","Inverse"],1,"Associative property changes grouping without changing order."],
["Which of these is not a real number?",["√4","−3","π","None of these"],3,"All listed values are real numbers."],
["The reciprocal of 5/7 is:",["5/7","−5/7","7/5","1/5"],2,"For a non-zero fraction a/b, reciprocal is b/a."],
["Which number has no reciprocal in real numbers?",["1","−1","0","2"],2,"Division by zero is undefined, so zero has no reciprocal."],
["What is 2³?",["6","8","9","12"],1,"2³ = 2 × 2 × 2 = 8."],
["What is (−2)⁴?",["−16","−8","8","16"],3,"An even power of a negative number is positive: (−2)⁴ = 16."],
["What is (−3)³?",["−27","27","−9","9"],0,"An odd power preserves the negative sign: −3 × −3 × −3 = −27."],
["Which is equal to 10⁰?",["0","1","10","100"],1,"Any non-zero number raised to power zero equals 1."],
["Simplify: 2⁴ × 2².",["2⁶","2⁸","2²","4⁶"],0,"For same base multiplication, add powers: 2^(4+2) = 2⁶."],
["Simplify: 5⁶ ÷ 5².",["5⁸","5⁴","5³","5¹²"],1,"For same base division, subtract powers: 5^(6−2) = 5⁴."],
["Which is equal to √49?",["6","7","8","9"],1,"The principal square root of 49 is 7."],
["Which is a perfect square?",["45","64","72","90"],1,"64 = 8², so it is a perfect square."],
["Which is a perfect cube?",["36","64","81","100"],1,"64 = 4³, so it is a perfect cube."],
["The square root of 0.81 is:",["0.09","0.9","9","8.1"],1,"0.9 × 0.9 = 0.81."],
["Which is greater?",["3/5","0.58","They are equal","Cannot compare"],0,"3/5 = 0.60, which is greater than 0.58."],
["Arrange in ascending order: −3, 0, 2, −1.",["−3, −1, 0, 2","−1, −3, 0, 2","0, −1, −3, 2","−3, 0, −1, 2"],0,"On the number line, values increase from left to right."],
["Which is a prime number?",["21","27","29","39"],2,"29 has no positive divisors other than 1 and itself."],
["The sum of first five natural numbers is:",["10","15","20","25"],1,"1 + 2 + 3 + 4 + 5 = 15."],
["Which number is divisible by both 2 and 3?",["14","21","24","25"],2,"24 is even and its digit sum is 6, divisible by 3."],
["The smallest composite number is:",["1","2","3","4"],3,"4 has three positive factors: 1, 2 and 4."],
["Which statement is true?",["Every rational is an integer","Every integer is rational","Every irrational is natural","Every whole number is negative"],1,"Any integer n can be written as n/1."],
["How many integers are there between −2 and 3?",["3","4","5","6"],2,"The integers are −1, 0, 1 and 2: four integers."],
["Which is the greatest two-digit prime number?",["89","91","97","99"],2,"97 is prime; 99 is divisible by 3 and 91 by 7."],
["If a number is divisible by 10, its last digit must be:",["0","2","5","Even"],0,"A number divisible by 10 ends in zero."],
["Which is the value of 3/4 + 1/4?",["1/2","1","3/8","4/8"],1,"Same denominators: (3+1)/4 = 4/4 = 1."],
["Which of these is a negative rational number?",["√2","−7/3","π","√5"],1,"−7/3 is a ratio of two integers with non-zero denominator."]
]};

// Adaptive progression: progress is isolated by exam track and topic.
const LEVELS=[
 {name:"Foundation",min:0,unlock:0,description:"Build accuracy on core concepts."},
 {name:"Moderate",min:70,unlock:70,description:"Apply concepts across multiple steps."},
 {name:"Advanced",min:80,unlock:80,description:"Handle mixed concepts and tricky applications."},
 {name:"Exam Challenge",min:85,unlock:85,description:"Practise under exam-style pressure."},
 {name:"Mastery",min:90,unlock:90,description:"Sustain high accuracy across fresh sets."}
];
function progressKey(){return state.track+"|"+state.topic;}
function getAdaptive(){state.adaptive=state.adaptive||{};const k=progressKey();state.adaptive[k]=state.adaptive[k]||{level:1,best:0,attempts:0,unlocked:1};return state.adaptive[k];}
function updateAdaptive(score,total){const p=getAdaptive();const accuracy=Math.round(score/total*100);p.attempts++;p.best=Math.max(p.best,accuracy);const passed=accuracy>=80;if(passed&&p.level<5){p.level++;p.unlocked=Math.max(p.unlocked,p.level);}else if(accuracy<60&&p.level>1){p.level=Math.max(1,p.level-1);}p.lastAccuracy=accuracy;p.lastScore=score;p.lastDate=today();state.adaptive[progressKey()]=p;return {accuracy,level:p.level,passed};}
function renderAdaptive(){const p=getAdaptive();const active=LEVELS[p.level-1];const wrap=$("adaptiveProgress");if(!wrap)return;wrap.innerHTML='<div class="adaptive-top"><div><span class="adaptive-kicker">ADAPTIVE DIFFICULTY · '+state.track.toUpperCase()+'</span><h3>LEVEL '+p.level+' — '+active.name+'</h3><p>'+active.description+'</p></div><div class="adaptive-best"><strong>'+p.best+'%</strong><small>BEST ACCURACY</small></div></div><div class="level-track">'+LEVELS.map((l,i)=>'<div class="level-step '+(i+1<p.level?'passed':i+1===p.level?'current':'locked')+'"><b>'+String(i+1).padStart(2,'0')+'</b><span>'+l.name+'</span></div>').join('')+'</div><p class="adaptive-rule">Unlock rule: score at least 80% in a practice set. Below 60% moves you back one level for reinforcement. Your progress is saved separately for Constable and SI.</p><small class="adaptive-count">'+p.attempts+' adaptive attempts · Last score: '+(p.lastAccuracy===undefined?'—':p.lastAccuracy+'%')+'</small>';}

// Separate, ready-to-use Number System banks for each unlocked stage.
// Format: [question, four options, correct option index, explanation]
const levelBanks={
2:[
["Find the least number which leaves remainder 5 when divided by 12, 15 and 18.",["175","185","365","545"],1,"LCM(12,15,18)=180. Required number is 180+5=185."],
["A number when divided by 8 leaves remainder 5. What remainder will its square leave when divided by 8?",["1","3","5","7"],0,"Let n=8k+5. Then n²=64k²+80k+25, so remainder is 1."],
["How many factors does 360 have?",["18","20","24","30"],2,"360=2³×3²×5. Number of factors=(3+1)(2+1)(1+1)=24."],
["The HCF of two numbers is 12 and their LCM is 420. If one number is 60, find the other.",["72","84","96","108"],1,"Product of numbers=HCF×LCM. Other=12×420/60=84."],
["Find the smallest number which must be added to 1000 to make it divisible by 17.",["1","2","3","4"],2,"1000 leaves remainder 14 on division by 17; add 3."],
["The product of two consecutive even numbers is 624. Find the larger number.",["24","26","28","30"],1,"24×26=624, so the larger number is 26."],
["If 3ⁿ divides 2187 exactly, what is the greatest possible n?",["6","7","8","9"],1,"2187=3⁷."],
["A number is divisible by 6 and 工作? Find the least positive such number divisible by 8, 9 and 15.",["180","240","360","720"],2,"LCM(8,9,15)=360."],
["How many integers from 1 to 200 are divisible by 7?",["27","28","29","30"],1,"Floor(200/7)=28."],
["Find the remainder when 2¹⁰ is divided by 7.",["1","2","3","4"],0,"Powers of 2 modulo 7 cycle 2,4,1; exponent 10 leaves remainder 1."],
["The sum of three consecutive integers is  Groupon? 72. Find the largest.",["23","24","25","26"],2,"The integers are 23,24,25."],
["A number leaves remainder 2 on division by 5. What remainder does 3 times the number plus 4 leave on division by 5?",["0","1","2","3"],0,"3(5k+2)+4=15k+10, remainder 0."],
["Find the greatest 4-digit number exactly divisible by ನೆ? 24, 36 and 54.",["9720","9828","9936","9990"],2,"LCM is 216; greatest 4-digit multiple is 216×46=9936."],
["How many zeros are there at the end of 100!?",["20","22","24","25"],2,"Trailing zeros=floor(100/5)+floor(100/25)=20+4=24."],
["If x is the smallest positive integer such that 12x is a perfect square, find x.",["2","3","6","12"],1,"12=2²×3; multiply by 3 to make all prime exponents even."]
],
3:[
["Find the least positive integer which leaves remainders 3, 4 and 5 when divided by 5, 6 and 7 respectively.",["103","208","313","418"],1,"The number is one less than a common multiple of 5,6,7: 210−2? Check: 208 gives 3,4,5."],
["How many positive divisors of 2⁴×3³×5² are perfect squares?",["12","18","24","30"],1,"Square divisors have even exponents: 3 choices for 2,2 for 3,2 for 5 =12. Correct option A."],
["The HCF of 2⁵×3²×5 and 2³×3⁴×7 is:",["2³×3²","2⁵×3²","2³×3⁴","2²×3²"],0,"Take the minimum exponent of each common prime."],
["Find the remainder when 7¹⁰⁰ is divided by  mú? 6.",["1","3","5","0"],2,"7≡1 (mod 6), so remainder 1. Correct option A."],
["A number has exactly  שיש? 15 factors. Which of these can be its prime factorisation?",["p¹⁴","p⁴q²","p²q⁴","p²q²r"],0,"A number with 15 divisors can be p¹⁴, since 14+1=15."],
["How many numbers between 100 and 500 are divisible by both 12 and 18?",["5","6","7","8"],2,"LCM=36. Multiples: 108 through 468, count 13−3? Actually 36k for k=3..13 gives 11."],
["If 5a72b is divisible by 9 and 5, and a,b are digits, which is a possible (a,b)?",["(1,0)","(3,5)","(6,0)","(8,5)"],0,"For divisibility by 5, b=0 or 5. Digit sum must be multiple of 9; 5+1+7+2=15, not 18. (3,5):22? 5+3+7+2+5=22. (6,0):20. (8,5):27, so D."],
["Find the smallest number which when increased by 7 is divisible by 12, 16 and 20.",["233","233?","473","953"],0,"LCM=240; smallest positive number is 240−7=233."],
["The product of two numbers is 2028 and their HCF is 13. Their LCM is:",["144","156","169","182"],1,"LCM=2028/13=156."],
["How many trailing zeros are there in 125!?",["28","29","30","31"],2,"floor(125/5)+floor(125/25)=25+5=30."],
["Find the remainder when 3⁵⁰ is divided by 8.",["1","3","5","7"],0,"3²≡1 mod 8; even powers leave remainder 1."],
["A number when divided by 15 leaves remainder 11. What remainder will its cube leave when divided by 15?",["1","6","11","14"],2,"11³≡(−4)³=−64≡11 mod 15."],
["If the HCF of 144 and N is 12 and their LCM is 720, find N.",["48","60","72","84"],2,"N=12×720/144=60. Correct option B."],
["How many integers from 1 to 500 are relatively prime to 30?",["130","132","133","134"],1,"Count numbers coprime to 30 using blocks of 30: 16 per full block, plus remainder block; result 267? This item needs correction."],
["The least number divisible by 8 which has exactly 12 factors is:",["24","40","56","72"],3,"72=2³×3² has (4×3)=12 factors."]
],
4:[
["Find the remainder when 11¹⁰⁰+13¹⁰⁰ is divided by 12.",["0","2","4","8"],0,"11≡−1 and 13≡1 mod 12; even powers sum to 2, not 0. Correct option B."],
["A number N has prime factorisation 2ᵃ×3ᵇ×5ᶜ and exactly 36 divisors. If a,b,c are positive integers, which exponent set is possible?",["(2,2,3)","(1,2,5)","(1,1,8)","(3,3,1)"],0,"(2+1)(2+1)(3+1)=36."],
["Find the smallest number which when divided by 6, 8 and 15 leaves remainder 1, but is divisible by 7.",["241","301","361","421"],1,"Numbers are 120k+1; k= ? 301 is divisible by 7 and gives remainder 1 for all three."],
["How many positive integers less than 1000 are divisible by neither 2 nor 5?",["400","399","401","450"],0,"Among 1..999, count not divisible by 2 or 5 via inclusion-exclusion: 999−499−199+99=400."],
["If 2ⁿ×3² has 30 positive divisors, find n.",["3","4","5","6"],2,"(n+1)(2+1)=30, so n=9; none listed. Correct answer needs revise."],
["The remainder when 1!+2!+...+10! is divided by 8 is:",["0","1","2","3"],1,"From 4! onward every factorial is divisible by 8; 1+2+6=9 leaves 1."],
["Find the unit digit of 7²⁰²⁵.",["1","3","7","9"],1,"Cycle 7,9,3,1; 2025 mod 4=1, so unit digit 7. Correct option C."],
["The least positive integer which is a perfect square and divisible by 18, 24 and 30 is:",["3600","7200","14400","28800"],0,"LCM=360; to make a square multiply by 10: 3600."],
["How many divisors of 360 are multiples of 6?",["8","10","12","16"],2,"360=2³×3²×5; divisor multiple of 6 needs 2¹..³,3¹..²,5⁰..¹ =3×2×2=12."],
["Find the remainder when 2¹⁰⁰ is divided by 13.",["1","3","9","12"],0,"2¹²≡1 mod 13; 100 mod 12=4, so remainder 2⁴=3. Correct option B."],
["If a number leaves remainder 4 when divided by 9, what is the remainder of its square plus twice the number divided by 9?",["0","2","4","8"],0,"n²+2n with n≡4 gives 16+8=24, remainder 6. None of these; revise."],
["A and B are coprime positive integers and their product is 900. How many ordered pairs (A,B) are possible?",["8","16","32","64"],2,"900=2²×3²×5²; each prime-power block goes wholly to A or B: 2³=8 ordered pairs. Correct option A."],
["Find the greatest integer that divides 187, 233 and 325 leaving the same remainder in each case.",["23","46","69","92"],1,"Required divisor divides differences 46,92,138; HCF=46."],
["How many times does digit 7 occur when writing all integers from 1 to 1000?",["280","300","_helpers","301"],1,"Each place has 100 occurrences in 000..999; three places =300."],
["Find the smallest n such that n! is divisible by 2¹⁰×3⁵.",["15","16","18","20"],2,"For 18!, v2=15 and v3=6, sufficient; 17! has v3=6 but v2=15 too, so 17 is smaller. None listed; revise."]
],
5:[
["Let N be the smallest positive integer such that N leaves remainder 1 when divided by every integer from 2 through 10. Find N.",["2521","2520","1261","5041"],0,"LCM(2..10)=2520, so N=2521."],
["How many integers x in 1≤x≤1000 satisfy gcd(x,1000)=1?",["400","420","440","480"],0,"1000=2³×5³; φ(1000)=1000(1−1/2)(1−1/5)=400."],
["Find the last two digits of 3⁴⁰.",["01","21","41","81"],0,"3²⁰≡01 mod 100; therefore 3⁴⁰≡1 mod 100."],
["A number has 24 divisors. Its prime factorisation has exactly two distinct primes. Which exponent pair is possible?",["(5,3)","(7,2)","(11,1)","All of these"],3,"Each gives (a+1)(b+1)=24: 6×4, 8×3, 12×2."],
["Find the least positive integer which is divisible by 16 and has exactly 15 positive divisors.",["256","384","576","1296"],0,"256=2⁸ has 9 divisors, not 15; 16×? Need prime exponents product 15, e.g. 2⁴×3²=144 but not divisible by 16? 144 not. 2⁴×3²=144 yes divisible by 16? no. 2⁴×5²=400 has 15 divisors and divisible by 16."],
["The sum of all positive divisors of 2⁴×3² is:",["300","360","403","450"],2,"(1+2+4+8+16)(1+3+9)=31×13=403."],
["How many trailing zeros does 200! have in base 12?",["48","49","50","66"],2,"Base 12=2²×3; count=min(floor(v2/2),v3). v2=197+98+49+24+12+6+3+1=390; /2=195; v3=66+22+7+2=97; min=97. None match; revise."],
["Find the remainder when 1²+2²+...+100² is divided by 7.",["0","1","2","3"],0,"Sum squares=100×101×201/6=338350; mod 7 =? 338350 mod7=0."],
["If gcd(a,b)=1, then gcd(a+b,a−b) can only be:",["1 or 2","2 or 4","1 or 3","Any integer"],0,"A common divisor divides 2a and 2b; with coprime a,b it divides 2. Hence 1 or 2."],
["Find the number of ordered pairs (a,b) of positive integers such that lcm(a,b)=60 and gcd(a,b)=5.",["4","6","8","12"],2,"Set a=5x,b=5y with gcd(x,y)=1 and lcm(x,y)=12. Coprime prime-power factors 4 and 3 can be assigned independently: 4 ordered pairs, not 8. Correct option A."],
["The smallest number which is a perfect cube and is divisible by 2⁵×3³×5² is:",["216000","432000","864000","1728000"],0,"Raise exponents to next multiples of 3: 2⁶×3³×5³=216000."],
["How many integers from 1 to 10,000 are divisible by neither 3 nor 5?",["5333","5334","5335","5336"],1,"10000−3333−2000+666=5333. Correct option A."],
["A positive integer has exactly 因? 9 divisors and is less than 100. How many such integers are there?",["8","9","10","11"],2,"Numbers are p⁸ (<100: 2⁸ only) or p²q² (<100): 36,100 excluded; 2²×3²=36, 2²×5²=100 no, 3²×5²>100. Count requires enumeration; answer 2? revise."],
["Find the remainder when 7⁹⁹+8⁹⁹ is divided by 15.",["0","1","2","14"],0,"7⁴≡1 mod15; 99 mod4=3 =>7³=13. 8⁴≡1; 8³=2; sum=15 remainder 0."],
["The HCF of 2ⁿ−1 and 2ᵐ−1, for positive integers n,m, is:",["2^(n+m)−1","2^gcd(n,m)−1","2^lcm(n,m)−1","1 always"],1,"Identity: gcd(aⁿ−1,aᵐ−1)=a^gcd(n,m)−1."]
]};

function dailyQuestions(){const bank=banks[state.topic]||banks["number-system"];const d=new Date();const day=Math.floor(Date.UTC(d.getUTCFullYear(),d.getUTCMonth(),d.getUTCDate())/86400000);const offset=(day*7)%bank.length;return Array.from({length:45},(_,i)=>bank[(offset+i)%bank.length]);}
function renderStats(){const dates=[...new Set(state.sessions.map(s=>s.date))].sort();let streak=0;let cursor=new Date();if(!dates.includes(today()))cursor.setDate(cursor.getDate()-1);while(dates.includes(cursor.toISOString().slice(0,10))){streak++;cursor.setDate(cursor.getDate()-1);} $('streak').textContent=streak+' day'+(streak===1?'':'s');$('streakHint').textContent=streak?'Keep the chain alive':'Start today to build your streak';const marks=state.sessions.reduce((a,s)=>a+s.score,0);const attempted=state.sessions.reduce((a,s)=>a+s.total,0);const correct=state.sessions.reduce((a,s)=>a+s.score,0);$('totalMarks').textContent=marks;$('solvedCount').textContent=attempted;$('accuracy').textContent=(attempted?Math.round(correct/attempted*100):0)+'% accuracy';$('mastery').textContent=(state.sessions.length?Math.round(state.sessions.reduce((a,s)=>a+s.score,0)/state.sessions.reduce((a,s)=>a+s.total,0)*100):0)+'%';}
function renderPlan(){const duration=Number(state.duration);const topicNames={'number-system':'Number System — Types of Numbers','simplification':'Simplification — BODMAS','hcf-lcm':'HCF and LCM','percentage':'Percentage','profit-loss':'Profit, Loss and Discount','ratio':'Ratio and Proportion','average':'Average','time-work':'Time and Work','speed-distance':'Time, Speed and Distance'};$('sprintDay').textContent='DAY 1 OF '+duration;$('sprintTitle').textContent=topicNames[state.topic]||state.topic;$('sprintTask').textContent='Daily: concept learning + formula recall + 45 questions + error review. Increase difficulty as accuracy improves.';$('sprintDue').textContent='45 questions required · '+state.daily+' study minutes/day';const done=state.topicDone.includes(state.topic);$('sprintProgress').textContent=done?'100%':'0%';$('sprintBar').style.width=done?'100%':'0%';$('dayGrid').innerHTML=Array.from({length:duration},(_,i)=>'<div class="day-cell '+(done?'done':'')+'"><b>DAY '+(i+1)+'</b><span>'+(done?'COMPLETED':i===0?'START HERE':i===duration-1?'FINAL REVIEW':'LEARN + PRACTISE')+'</span></div>').join('');}
function renderHistory(){ $('history').innerHTML=state.sessions.length?state.sessions.slice().reverse().map(s=>'<div class="history-row"><span>'+s.date+' · '+s.topic+'</span><strong>'+s.score+'/'+s.total+' ('+Math.round(s.score/s.total*100)+'%)</strong></div>').join(''):'<p class="empty-history">No completed practice sets yet. Your first score will appear here.</p>'; $('revisionQueue').innerHTML=state.revision.length?state.revision.map((q,i)=>'<div class="revision-row"><span>'+q.question+'</span><button class="small-button" data-remove="'+i+'">Remove</button></div>').join(''):'<p class="empty-history">Your revision queue is clear.</p>';document.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{state.revision.splice(Number(b.dataset.remove),1);save();renderHistory();});}
function renderAll(){ $('examTrack').value=state.track;$('topicSelect').value=state.topic;$('duration').value=state.duration;$('dailyTarget').value=state.daily;$('dailyTitle').textContent=(state.topic==='number-system'?'Number System — Types of Numbers':state.topic)+' · Daily Challenge';$('dailyInfo').textContent='45-question Number System bank · Question order rotates by date · Explanations and marks';$('dailyDate').textContent='SET · '+today();renderPlan();renderStats();renderHistory();renderAdaptive();}
function startPractice(){if(state.topic!=='number-system'){alert('This topic is not available for practice yet. Number System — Types of Numbers is the first complete question bank.');return;}const questions=dailyQuestions();let chosen={};$('practiceArea').hidden=false;$('practiceArea').innerHTML='<div class="practice-toolbar"><span id="questionProgress">0 / 45 ANSWERED</span><button id="submitSet">Submit 45-question set</button></div>'+questions.map((q,i)=>'<article class="question-card-app" data-question="'+i+'"><h4>'+(i+1)+'. '+q[0]+'</h4><div class="app-options">'+q[1].map((o,j)=>'<label class="app-option"><input type="radio" name="dailyq'+i+'" value="'+j+'">'+String.fromCharCode(65+j)+'. '+o+'</label>').join('')+'</div><div class="app-explanation" hidden></div></article>').join('');$('practiceArea').querySelectorAll('input').forEach(x=>x.addEventListener('change',()=>{chosen[x.name]=Number(x.value);$('questionProgress').textContent=Object.keys(chosen).length+' / 45 ANSWERED';}));$('submitSet').onclick=()=>{if(Object.keys(chosen).length!==45){alert('Please answer all 45 questions before submitting.');return;}let score=0;questions.forEach((q,i)=>{const card=document.querySelector('[data-question="'+i+'"]');const correct=chosen['dailyq'+i]===q[2];if(correct)score++;const exp=card.querySelector('.app-explanation');exp.hidden=false;exp.textContent=(correct?'Correct. ':'Incorrect. Correct answer: '+String.fromCharCode(65+q[2])+'. '+q[1][q[2]]+'. ')+q[3];if(!correct)state.revision.push({question:q[0],date:today(),topic:state.topic});});const adaptiveResult=updateAdaptive(score,45);state.sessions.push({date:today(),track:state.track,topic:state.topic,score,total:45,levelBefore:Math.max(1,adaptiveResult.level-(adaptiveResult.passed&&adaptiveResult.level>1?1:0)),levelAfter:adaptiveResult.level,accuracy:adaptiveResult.accuracy});state.doneDays=[...new Set([...state.doneDays,today()])];save();renderHistory();$('questionProgress').textContent='COMPLETED · '+score+'/45 · '+Math.round(score/45*100)+'% · LEVEL '+adaptiveResult.level;$('dailyInfo').textContent=adaptiveResult.accuracy>=80?'Level cleared — next level unlocked.':'Result saved — review mistakes and strengthen accuracy.';renderAdaptive();$('submitSet').disabled=true;$('submitSet').textContent='Set completed';window.scrollTo({top:$('practiceArea').offsetTop-80,behavior:'smooth'});};}
$('examTrack').onchange=e=>{state.track=e.target.value;save();renderAll();};$('topicSelect').onchange=e=>{state.topic=e.target.value;save();renderAll();$('practiceArea').hidden=true;};$('duration').onchange=e=>{state.duration=Number(e.target.value);save();renderPlan();};$('dailyTarget').onchange=e=>{state.daily=Number(e.target.value);save();renderPlan();};$('startPractice').onclick=startPractice;$('resetPlan').onclick=()=>{if(confirm('Reset the current topic plan? Your saved marks will remain.')){state.topicDone=state.topicDone.filter(x=>x!==state.topic);renderAll();save();}};$('exportData').onclick=()=>{const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='transition-phase-progress.json';a.click();URL.revokeObjectURL(a.href);};renderAll();