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
["How many integers are there between −2 and 3?",["3","4","5","6"],1,"The integers are −1, 0, 1 and 2: four integers."],
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
function getAdaptive(){state.adaptive=state.adaptive||{};const k=progressKey();state.adaptive[k]=state.adaptive[k]||{level:1,selectedLevel:1,best:0,attempts:0,unlocked:1};const p=state.adaptive[k];p.selectedLevel=p.selectedLevel||1;p.unlocked=Math.max(p.unlocked||1,p.level||1);return p;}
function updateAdaptive(score,total){const p=getAdaptive();const accuracy=Math.round(score/total*100);const previousUnlocked=p.unlocked;p.attempts++;p.best=Math.max(p.best,accuracy);const passed=accuracy>=80;if(passed&&p.selectedLevel===p.unlocked&&p.unlocked<5){p.unlocked++;p.level=p.unlocked;p.selectedLevel=p.unlocked;}else if(accuracy<60&&p.selectedLevel>1){p.selectedLevel--;}p.lastAccuracy=accuracy;p.lastScore=score;p.lastDate=today();state.adaptive[progressKey()]=p;return {accuracy,level:p.selectedLevel,unlocked:p.unlocked,unlockedNow:p.unlocked>previousUnlocked,passed};}
function renderAdaptive(){const p=getAdaptive();const active=LEVELS[p.selectedLevel-1];const wrap=$("adaptiveProgress");if(!wrap)return;wrap.innerHTML='<div class="adaptive-top"><div><span class="adaptive-kicker">ADAPTIVE DIFFICULTY · '+state.track.toUpperCase()+'</span><h3>LEVEL '+p.selectedLevel+' — '+active.name+'</h3><p>'+active.description+'</p></div><div class="adaptive-best"><strong>'+p.best+'%</strong><small>BEST ACCURACY</small></div></div><div class="level-track">'+LEVELS.map((l,i)=>{const n=i+1,locked=n>p.unlocked;return '<button type="button" class="level-step '+(n===p.selectedLevel?'current':n<p.unlocked?'passed':'locked')+'" data-level="'+n+'" aria-label="'+(locked?'Locked':'Open')+' Level '+n+'"><b>'+String(n).padStart(2,'0')+'</b><span>'+l.name+'</span><small>'+(locked?'LOCKED':n===p.selectedLevel?'SELECTED':'OPEN')+'</small></button>';}).join('')+'</div><p class="adaptive-rule">Stage unlock: score at least 80% in the previous stage. A score below 60% recommends revisiting the previous stage. Your progress is saved separately for Constable and SI.</p><small class="adaptive-count">'+p.attempts+' adaptive attempts · Last score: '+(p.lastAccuracy===undefined?'—':p.lastAccuracy+'%')+' · '+p.unlocked+'/5 stages unlocked</small>';
wrap.querySelectorAll('[data-level]').forEach(btn=>btn.addEventListener('click',()=>{const n=Number(btn.dataset.level);if(n>p.unlocked){alert('Stage '+n+' is locked. Pehle Stage '+(n-1)+' clear karo with minimum 80% marks.');return;}p.selectedLevel=n;state.adaptive[progressKey()]=p;save();renderAdaptive();$('dailyTitle').textContent='Number System — '+LEVELS[n-1].name+' Challenge';$('dailyInfo').textContent=(n===1?45:levelBanks[n].length)+' questions · Stage '+n+' bank · Explanations and score tracking';$('practiceArea').hidden=true;}));}
const levelBanks={
2:[
["LCM of 12,15,18?",["90","120","180","360"],2,"LCM=2²×3²×5=180."],
["If n≡5 (mod 8), n² mod 8 is?",["1","3","5","7"],0,"(8k+5)² has remainder 25≡1."],
["Number of factors of 360?",["18","20","24","30"],2,"360=2³×3²×5; count=4×3×2=24."],
["HCF=12, LCM=420, one number=60. Other number?",["72","84","96","108"],1,"Product=12×420; other=5040/60=84."],
["Least number to add to 1000 for divisibility by 17?",["1","2","3","4"],2,"1000 leaves remainder 14; add 3."],
["Greatest 4-digit number divisible by 24,36,54?",["9720","9828","9936","9990"],2,"LCM=216; 216×46=9936."],
["Trailing zeros in 100!?",["20","22","24","25"],2,"20+4=24."],
["Remainder of 2¹⁰ ÷ 7?",["1","2","3","4"],1,"2¹⁰≡2 (mod 7), using cycle 2,4,1."],
["How many numbers 1–200 divisible by 7?",["27","28","29","30"],1,"floor(200/7)=28."],
["Smallest x such that 12x is a square?",["2","3","6","12"],1,"12=2²×3; multiply by 3."],
["If n≡2 (mod 5), remainder of 3n+4?",["0","1","2","3"],0,"3×2+4=10≡0."],
["Product=2028 and HCF=13. LCM?",["144","156","169","182"],1,"2028/13=156."]
],
3:[
["Remainder of 3⁵⁰ divided by 8?",["1","3","5","7"],0,"3²≡1 mod 8; even powers give 1."],
["Perfect-square divisors of 2⁴×3³×5²?",["8","12","18","24"],1,"Choices of even exponents: 3×2×2=12."],
["HCF of 2⁵×3²×5 and 2³×3⁴×7?",["2³×3²","2⁵×3²","2³×3⁴","2²×3²"],0,"Take minimum exponents of common primes."],
["Least positive number leaving remainders 3,4,5 on division by 5,6,7?",["103","208","313","418"],1,"208 gives 3,4,5."],
["Number of divisors of 2⁴×3²×5?",["24","30","36","40"],1,"(4+1)(2+1)(1+1)=30."],
["Remainder of 7¹⁰⁰ divided by 6?",["0","1","3","5"],1,"7≡1 mod 6."],
["Greatest divisor giving same remainder for 187,233,325?",["23","46","69","92"],1,"HCF of differences 46,138,92 is 46."],
["Trailing zeros in 125!?",["28","29","30","31"],3,"25+5=30."],
["Unit digit of 7²⁰²⁵?",["1","3","7","9"],2,"Cycle 7,9,3,1; exponent remainder 1."],
["Count numbers 1–500 divisible by 3 or 5?",["200","233","266","300"],1,"166+100−33=233."],
["HCF=13 and product=2028. LCM?",["144","156","169","182"],1,"LCM=product/HCF=156."],
["Least square divisible by 18,24,30?",["3600","7200","14400","28800"],0,"LCM=360=2³×3²×5; multiply by 10."]
],
4:[
["Remainder of 11¹⁰⁰+13¹⁰⁰ divided by 12?",["0","1","2","4"],2,"(−1)^even+1^even=2 mod 12."],
["Count integers 1–999 divisible by neither 2 nor 5?",["399","400","401","450"],1,"999−499−199+99=400."],
["Remainder of 1!+...+10! divided by 8?",["0","1","2","3"],1,"Terms 4! onward divisible by 8; 1+2+6=9."],
["Remainder of 2¹⁰⁰ divided by 13?",["1","2","3","4"],2,"2¹²≡1; 100 mod 12=4; 2⁴=16≡3."],
["If n≡4 mod 9, remainder of n²+2n?",["4","5","6","7"],2,"16+8=24≡6."],
["How many ordered coprime pairs (a,b) with ab=900?",["4","8","12","16"],1,"900=2²×3²×5²; assign each prime-power block to a or b: 2³=8."],
["Least cube divisible by 2⁵×3³×5²?",["216000","432000","864000","1728000"],0,"Raise exponents to multiples of 3: 2⁶×3³×5³=216000."],
["Remainder of 7⁹⁹+8⁹⁹ divided by 15?",["0","1","2","14"],0,"7⁹⁹≡13 and 8⁹⁹≡2; sum=15."],
["Occurrences of digit 7 in integers 1–999?",["280","300","320","333"],1,"Across 000–999 each of 3 places has 100 sevens."],
["HCF of 2¹⁰−1 and 2⁶−1?",["3","7","15","31"],0,"2^gcd(10,6)−1=2²−1=3."],
["Divisors of 2³×3² that are multiples of 6?",["6","9","12","18"],0,"Exponent of 2:1..3 (3 choices); 3:1..2 (2 choices); total 6. Correct option A."],
["Remainder of 5¹⁰⁰ divided by 13?",["1","3","5","12"],0,"5²≡−1 mod13; 5¹⁰⁰=(5²)^50≡(−1)^50=1. Correct option A."]
],
5:[
["Smallest N leaving remainder 1 on division by every integer 2–10?",["2521","2520","1261","5041"],0,"LCM(2,...,10)=2520; add 1."],
["Count x from 1–1000 with gcd(x,1000)=1?",["400","420","440","480"],0,"φ(1000)=1000×1/2×4/5=400."],
["Last two digits of 3⁴⁰?",["01","21","41","81"],0,"3²⁰≡1 mod100, so 3⁴⁰≡1."],
["Which exponent pair gives exactly 24 divisors for pᵃqᵇ?",["(5,3)","(7,2)","(11,1)","All"],3,"(a+1)(b+1)=24 for each pair."],
["Smallest number divisible by 16 with exactly 15 divisors?",["400","480","560","640"],0,"400=2⁴×5²; divisor count=5×3=15."],
["Sum of divisors of 2⁴×3²?",["300","360","403","450"],2,"(1+2+4+8+16)(1+3+9)=31×13=403."],
["Remainder of 1²+2²+...+6² divided by 7?",["0","1","2","3"],0,"The sum is 91, which is divisible by 7."],
["If gcd(a,b)=1, gcd(a+b,a−b) can be?",["1 or 2","2 or 4","1 or 3","Any"],0,"Any common divisor divides 2a and 2b, hence divides 2."],
["Remainder of 7⁹⁹+8⁹⁹ divided by 15?",["0","1","2","14"],0,"7³≡13 and 8³≡2; exponent cycle 4 gives sum 15."],
["gcd(2ᵐ−1,2ⁿ−1) equals?",["2^(m+n)−1","2^gcd(m,n)−1","2^lcm(m,n)−1","1"],1,"Standard gcd-of-powers identity."],
["Perfect-cube divisors of 2⁶×3⁴?",["4","6","8","12"],1,"For exponent 6: 0,3,6 (3 choices); exponent 4: 0,3 (2 choices); total 6."],
["Least number divisible by 2⁴×3²×5 and both a square and cube?",["2⁶×3⁶×5⁶","2⁶×3⁶×5³","2⁴×3⁶×5⁶","2⁶×3³×5⁶"],0,"For both square and cube, exponents must be multiples of 6; minimum exponents are 6,6,6."]
]};
function dailyQuestions(){const p=getAdaptive();const level=p.selectedLevel;if(level===1){const bank=banks[state.topic]||banks["number-system"];const d=new Date();const day=Math.floor(Date.UTC(d.getUTCFullYear(),d.getUTCMonth(),d.getUTCDate())/86400000);const offset=(day*7)%bank.length;return Array.from({length:45},(_,i)=>bank[(offset+i)%bank.length]);}const bank=levelBanks[level]||[];const d=new Date();const day=Math.floor(Date.UTC(d.getUTCFullYear(),d.getUTCMonth(),d.getUTCDate())/86400000);const offset=(day*3)%bank.length;return Array.from({length:bank.length},(_,i)=>bank[(offset+i)%bank.length]);}
function renderStats(){const dates=[...new Set(state.sessions.map(s=>s.date))].sort();let streak=0;let cursor=new Date();if(!dates.includes(today()))cursor.setDate(cursor.getDate()-1);while(dates.includes(cursor.toISOString().slice(0,10))){streak++;cursor.setDate(cursor.getDate()-1);} $('streak').textContent=streak+' day'+(streak===1?'':'s');$('streakHint').textContent=streak?'Keep the chain alive':'Start today to build your streak';const marks=state.sessions.reduce((a,s)=>a+s.score,0);const attempted=state.sessions.reduce((a,s)=>a+s.total,0);const correct=state.sessions.reduce((a,s)=>a+s.score,0);$('totalMarks').textContent=marks;$('solvedCount').textContent=attempted;$('accuracy').textContent=(attempted?Math.round(correct/attempted*100):0)+'% accuracy';$('mastery').textContent=(state.sessions.length?Math.round(state.sessions.reduce((a,s)=>a+s.score,0)/state.sessions.reduce((a,s)=>a+s.total,0)*100):0)+'%';}
function renderPlan(){const duration=Number(state.duration);const topicNames={'number-system':'Number System — Types of Numbers','simplification':'Simplification — BODMAS','hcf-lcm':'HCF and LCM','percentage':'Percentage','profit-loss':'Profit, Loss and Discount','ratio':'Ratio and Proportion','average':'Average','time-work':'Time and Work','speed-distance':'Time, Speed and Distance'};$('sprintDay').textContent='DAY 1 OF '+duration;$('sprintTitle').textContent=topicNames[state.topic]||state.topic;$('sprintTask').textContent='Daily: concept learning + formula recall + 45 questions + error review. Increase difficulty as accuracy improves.';$('sprintDue').textContent='45 questions required · '+state.daily+' study minutes/day';const done=state.topicDone.includes(state.topic);$('sprintProgress').textContent=done?'100%':'0%';$('sprintBar').style.width=done?'100%':'0%';$('dayGrid').innerHTML=Array.from({length:duration},(_,i)=>'<div class="day-cell '+(done?'done':'')+'"><b>DAY '+(i+1)+'</b><span>'+(done?'COMPLETED':i===0?'START HERE':i===duration-1?'FINAL REVIEW':'LEARN + PRACTISE')+'</span></div>').join('');}
function renderHistory(){ $('history').innerHTML=state.sessions.length?state.sessions.slice().reverse().map(s=>'<div class="history-row"><span>'+s.date+' · '+s.topic+'</span><strong>'+s.score+'/'+s.total+' ('+Math.round(s.score/s.total*100)+'%)</strong></div>').join(''):'<p class="empty-history">No completed practice sets yet. Your first score will appear here.</p>'; $('revisionQueue').innerHTML=state.revision.length?state.revision.map((q,i)=>'<div class="revision-row"><span>'+q.question+'</span><button class="small-button" data-remove="'+i+'">Remove</button></div>').join(''):'<p class="empty-history">Your revision queue is clear.</p>';document.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{state.revision.splice(Number(b.dataset.remove),1);save();renderHistory();});}
function renderAll(){ $('examTrack').value=state.track;$('topicSelect').value=state.topic;$('duration').value=state.duration;$('dailyTarget').value=state.daily;$('dailyTitle').textContent=(state.topic==='number-system'?'Number System — Types of Numbers':state.topic)+' · Daily Challenge';$('dailyInfo').textContent=(getAdaptive().selectedLevel===1?45:levelBanks[getAdaptive().selectedLevel].length)+' questions · Level '+getAdaptive().selectedLevel+' bank · Explanations and marks';$('dailyDate').textContent='SET · '+today();renderPlan();renderStats();renderHistory();renderAdaptive();}
function startPractice(){if(state.topic!=='number-system'){alert('This topic is not available for practice yet. Number System — Types of Numbers is the first complete question bank.');return;}const questions=dailyQuestions();const total=questions.length;let chosen={};$('practiceArea').hidden=false;$('practiceArea').innerHTML='<div class="practice-toolbar"><span id="questionProgress">0 / '+total+' ANSWERED</span><button id="submitSet">Submit '+total+' -question set</button></div>'+questions.map((q,i)=>'<article class="question-card-app" data-question="'+i+'"><h4>'+(i+1)+'. '+q[0]+'</h4><div class="app-options">'+q[1].map((o,j)=>'<label class="app-option"><input type="radio" name="dailyq'+i+'" value="'+j+'">'+String.fromCharCode(65+j)+'. '+o+'</label>').join('')+'</div><div class="app-explanation" hidden></div></article>').join('');$('practiceArea').querySelectorAll('input').forEach(x=>x.addEventListener('change',()=>{chosen[x.name]=Number(x.value);$('questionProgress').textContent=Object.keys(chosen).length+' / '+total+' ANSWERED';}));$('submitSet').onclick=()=>{if(Object.keys(chosen).length!==total){alert('Please answer all '+total+' questions before submitting.');return;}let score=0;questions.forEach((q,i)=>{const card=document.querySelector('[data-question="'+i+'"]');const correct=chosen['dailyq'+i]===q[2];if(correct)score++;const exp=card.querySelector('.app-explanation');exp.hidden=false;exp.textContent=(correct?'Correct. ':'Incorrect. Correct answer: '+String.fromCharCode(65+q[2])+'. '+q[1][q[2]]+'. ')+q[3];if(!correct)state.revision.push({question:q[0],date:today(),topic:state.topic});});const adaptiveResult=updateAdaptive(score,total);state.sessions.push({date:today(),track:state.track,topic:state.topic,score,total,levelBefore:Math.max(1,adaptiveResult.level-(adaptiveResult.passed&&adaptiveResult.level>1?1:0)),levelAfter:adaptiveResult.level,accuracy:adaptiveResult.accuracy});state.doneDays=[...new Set([...state.doneDays,today()])];save();renderHistory();$('questionProgress').textContent='COMPLETED · '+score+'/'+total+' · '+Math.round(score/total*100)+'% · LEVEL '+adaptiveResult.level;$('dailyInfo').textContent=adaptiveResult.accuracy>=80?(adaptiveResult.unlockedNow?'Stage cleared — next stage unlocked.':'Stage passed — mastery maintained.'):'Stage not cleared. You need at least 80% to unlock the next stage.';renderAdaptive();$('submitSet').disabled=true;$('submitSet').textContent='Set completed';window.scrollTo({top:$('practiceArea').offsetTop-80,behavior:'smooth'});};}
$('examTrack').onchange=e=>{state.track=e.target.value;save();renderAll();$('practiceArea').hidden=true;};$('topicSelect').onchange=e=>{state.topic=e.target.value;save();renderAll();$('practiceArea').hidden=true;};$('duration').onchange=e=>{state.duration=Number(e.target.value);save();renderPlan();};$('dailyTarget').onchange=e=>{state.daily=Number(e.target.value);save();renderPlan();};$('startPractice').onclick=startPractice;$('resetPlan').onclick=()=>{if(confirm('Reset the current topic plan? Your saved marks will remain.')){state.topicDone=state.topicDone.filter(x=>x!==state.topic);renderAll();save();}};$('exportData').onclick=()=>{const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='transition-phase-progress.json';a.click();URL.revokeObjectURL(a.href);};renderAll();