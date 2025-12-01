import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

// ----------------------------------------------------------------------
// 语录数据库 (Quote Database) - 扩充至100条以上
// ----------------------------------------------------------------------
const QUOTES = [
  { text: "世上无难事，只要肯登攀。", source: "水调歌头·重上井冈山" },
  { text: "虚心使人进步，骄傲使人落后。", source: "中国共产党第八次全国代表大会开幕词" },
  { text: "星星之火，可以燎原。", source: "星星之火，可以燎原" },
  { text: "我们要保持过去革命战争时期的那么一股劲，那么一股革命热情，那么一种拼命精神，把革命工作做到底。", source: "坚持艰苦奋斗，密切联系群众" },
  { text: "许多事，不得不做，不得不做好。", source: "关于农业合作化问题" },
  { text: "没有调查，没有发言权。", source: "反对本本主义" },
  { text: "一万年太久，只争朝夕。", source: "满江红·和郭沫若同志" },
  { text: "战略上藐视敌人，战术上重视敌人。", source: "关于帝国主义和一切反动派是不是真老虎的问题" },
  { text: "不管风吹浪打，胜似闲庭信步。", source: "水调歌头·游泳" },
  { text: "我们不但善于破坏一个旧世界，我们还将善于建设一个新世界。", source: "在中国共产党第七届中央委员会第二次全体会议上的报告" },
  { text: "不到长城非好汉。", source: "清平乐·六盘山" },
  { text: "彻底的唯物主义者是无所畏惧的。", source: "在中国共产党全国宣传工作会议上的讲话" },
  { text: "与天奋斗，其乐无穷！与地奋斗，其乐无穷！与人奋斗，其乐无穷！", source: "奋斗自勉" },
  { text: "要在人民群众那里学得知识，制定政策，然后再去教育人民群众。", source: "关于领导方法的若干问题" },
  { text: "一切反动派都是纸老虎。", source: "和美国记者安娜·路易斯·斯特朗的谈话" },
  { text: "下定决心，不怕牺牲，排除万难，去争取胜利。", source: "愚公移山" },
  { text: "贪污和浪费是极大的犯罪。", source: "反对贪污浪费" },
  { text: "没有正确的政治观点，就等于没有灵魂。", source: "关于正确处理人民内部矛盾的问题" },
  { text: "全心全意地为人民服务，一刻也不脱离群众。", source: "论联合政府" },
  { text: "务必使同志们继续地保持谦虚、谨慎、不骄、不躁的作风，务必使同志们继续地保持艰苦奋斗的作风。", source: "在中国共产党第七届中央委员会第二次全体会议上的报告" },
  { text: "从群众中来，到群众中去。", source: "关于领导方法的若干问题" },
  { text: "可上九天揽月，可下五洋捉鳖，谈笑凯歌还。", source: "水调歌头·重上井冈山" },
  { text: "由于战争的锻炼，人民群众的觉悟大为提高。这也是一个重要条件。", source: "关于重庆谈判" },
  { text: "政策和策略是党的生命，各级领导同志务必充分注意，万万不可粗心大意。", source: "关于情况的通报" },
  { text: "要想知道梨子的滋味，就要亲口尝一尝。", source: "实践论" },
  { text: "我们爱好和平，但以斗争求和平则和平存，以妥协求和平则和平亡。", source: "目前形势和我们的任务" },
  { text: "人是要有一点精神的。", source: "在中国共产党第八届中央委员会第二次全体会议上的讲话" },
  { text: "团结紧张，严肃活泼。", source: "抗大校训" },
  { text: "好好学习，天天向上。", source: "为“中国儿童”杂志题词" },
  { text: "自己动手，丰衣足食。", source: "生产运动" },
  { text: "这个军队具有一往无前的精神，它要压倒一切敌人，而决不被敌人所屈服。", source: "论联合政府" },
  { text: "雄关漫道真如铁，而今迈步从头越。", source: "忆秦娥·娄山关" },
  { text: "无限风光在险峰。", source: "七绝·为李进同志题所摄庐山仙人洞照" },
  { text: "今日长缨在手，何时缚住苍龙？", source: "清平乐·六盘山" },
  { text: "红军不怕远征难，万水千山只等闲。", source: "七律·长征" },
  { text: "为有牺牲多壮志，敢教日月换新天。", source: "七律·到韶山" },
  { text: "世界是你们的，也是我们的，但是归根结底是你们的。", source: "在莫斯科接见中国留学生时的讲话" },
  { text: "你们青年人朝气蓬勃，正在兴旺时期，好像早晨八九点钟的太阳。希望寄托在你们身上。", source: "在莫斯科接见中国留学生时的讲话" },
  { text: "读书是学习，使用也是学习，而且是更重要的学习。", source: "中国革命战争的战略问题" },
  { text: "通过实践而发现真理，又通过实践而证实真理和发展真理。", source: "实践论" },
  { text: "主观主义、宗派主义、党八股，是三种歪风邪气。", source: "整顿党的作风" },
  { text: "惩前毖后，治病救人。", source: "整顿党的作风" },
  { text: "精兵简政。", source: "抗日时期的十大政策" },
  { text: "谁是我们的敌人？谁是我们的朋友？这个问题是革命的首要问题。", source: "中国社会各阶级的分析" },
  { text: "革命不是请客吃饭，不是做文章，不是绘画绣花，不能那样雅致，那样从容不迫，文质彬彬，那样温良恭俭让。", source: "湖南农民运动考察报告" },
  { text: "只有人民，才是创造世界历史的动力。", source: "论联合政府" },
  { text: "群众是真正的英雄，而我们自己则往往是幼稚可笑的。", source: "“农村调查”的序言" },
  { text: "对于困难，要看到，要分析，要对待。除此之外，我们没有别的法子。", source: "关于重庆谈判" },
  { text: "什么叫工作，工作就是斗争。", source: "关于重庆谈判" },
  { text: "越是困难的地方越是要去，这才是好同志。", source: "关于重庆谈判" },
  { text: "我们是为人民服务的，所以，我们如果有缺点，就不怕别人批评指出。", source: "为人民服务" },
  { text: "一个人能力有大小，但只要有这点精神，就是一个高尚的人，一个纯粹的人，一个有道德的人，一个脱离了低级趣味的人，一个有益于人民的人。", source: "纪念白求恩" },
  { text: "用革命的两手，对付反革命的两手。", source: "第二次世界大战的转折点" },
  { text: "人不犯我，我不犯人；人若犯我，我必犯人。", source: "论政策" },
  { text: "哪里有压迫，哪里就有反抗。", source: "在延安各界庆祝斯大林六十寿辰大会上的讲话" },
  { text: "前途是光明的，道路是曲折的。", source: "关于重庆谈判" },
  { text: "牢骚太盛防肠断，风物长宜放眼量。", source: "七律·和柳亚子先生" },
  { text: "待到山花烂漫时，她在丛中笑。", source: "卜算子·咏梅" },
  { text: "天若有情天亦老，人间正道是沧桑。", source: "七律·人民解放军占领南京" },
  { text: "宜将剩勇追穷寇，不可沽名学霸王。", source: "七律·人民解放军占领南京" },
  { text: "萧瑟秋风今又是，换了人间。", source: "浪淘沙·北戴河" },
  { text: "鹰击长空，鱼翔浅底，万类霜天竞自由。", source: "沁园春·长沙" },
  { text: "怅寥廓，问苍茫大地，谁主沉浮？", source: "沁园春·长沙" },
  { text: "自信人生二百年，会当水击三千里。", source: "残句" },
  { text: "江山如此多娇，引无数英雄竞折腰。", source: "沁园春·雪" },
  { text: "俱往矣，数风流人物，还看今朝。", source: "沁园春·雪" },
  { text: "多少事，从来急；天地转，光阴迫。", source: "满江红·和郭沫若同志" },
  { text: "愚公移山，改造中国。", source: "七律·登庐山" },
  { text: "冷眼向洋看世界，热风吹雨洒江天。", source: "七律·登庐山" },
  { text: "不要染上官僚主义作风。", source: "在中共八届二中全会上的讲话" },
  { text: "加强纪律性，革命无不胜。", source: "关于军队整编的指示" },
  { text: "路线是个纲，纲举目张。", source: "在庐山会议上的讲话" },
  { text: "错误和挫折教训了我们，使我们比较地聪明起来了。", source: "论人民民主专政" },
  { text: "丢掉幻想，准备斗争。", source: "丢掉幻想，准备斗争" },
  { text: "真理有时在少数人手里。", source: "在中共八届七中全会上的讲话" },
  { text: "喜看稻菽千重浪，遍地英雄下夕烟。", source: "七律·到韶山" },
  { text: "坐地日行八万里，巡天遥看一千河。", source: "七律二首·送瘟神" },
  { text: "借问瘟君欲何往，纸船明烛照天烧。", source: "七律二首·送瘟神" },
  { text: "春风杨柳万千条，六亿神州尽舜尧。", source: "七律二首·送瘟神" },
  { text: "中华儿女多奇志，不爱红装爱武装。", source: "七绝·为女民兵题照" },
  { text: "金猴奋起千钧棒，玉宇澄清万里埃。", source: "七律·和郭沫若同志" },
  { text: "暮色苍茫看劲松，乱云飞渡仍从容。", source: "七绝·为李进同志题所摄庐山仙人洞照" },
  { text: "独有英雄驱虎豹，更无豪杰怕熊罴。", source: "七律·冬云" },
  { text: "梅花欢喜漫天雪，冻死苍蝇未足奇。", source: "七律·冬云" },
  { text: "在这世界上，不是东风压倒西风，就是西风压倒东风。", source: "在各国共产党和工人党代表会议上的讲话" },
  { text: "百花齐放，百家争鸣。", source: "关于正确处理人民内部矛盾的问题" },
  { text: "古为今用，洋为中用。", source: "对中央音乐学院的指示" },
  { text: "发展体育运动，增强人民体质。", source: "为中华全国体育总会成立题词" },
  { text: "生的伟大，死的光荣。", source: "为刘胡兰题词" },
  { text: "我们应该谦虚，谨慎，戒骄，戒躁，全心全意为中国人民服务。", source: "两个中国之命运" },
  { text: "房子是应该经常打扫的，不打扫就会积满了灰尘；脸是应该经常洗的，不洗也就会灰尘满面。", source: "论联合政府" },
  { text: "我们的责任，是向人民负责。", source: "抗日时期的经济问题和财政问题" },
  { text: "我们要有准备。有了准备，就恰当地应付各种复杂的局面。", source: "在中共七届四中全会上的讲话" },
  { text: "掌握思想教育，是团结全党进行伟大政治斗争的中心环节。", source: "论联合政府" },
  { text: "对于马克思主义的理论，要能够精通它、应用它，精通的目的全在于应用。", source: "整顿党的作风" },
  { text: "如果要看前途，一定要看历史。", source: "关于重庆谈判" },
  { text: "让哲学从哲学家的课堂里和书本里解放出来，变为群众手里的尖锐武器。", source: "关注哲学工作" },
  { text: "凡是敌人反对的，我们就要拥护；凡是敌人拥护的，我们就要反对。", source: "和中央社、扫荡报、新民报三记者的谈话" },
  { text: "我们不但要提出任务，而且要解决完成任务的方法问题。", source: "关心群众生活，注意工作方法" },
  { text: "榜样的力量是无穷的。", source: "关于领导方法的若干问题" },
  { text: "政治路线确定之后，干部就是决定的因素。", source: "中国共产党在民族战争中的地位" },
  { text: "没有文化的军队是愚蠢的军队，而愚蠢的军队是不能战胜敌人的。", source: "文化工作中的统一战线" },
  { text: "人民，只有人民，才是创造世界历史的动力。", source: "论联合政府" },
  { text: "把医疗卫生工作的重点放到农村去。", source: "关于医疗卫生工作的指示" },
  { text: "军民团结如一人，试看天下谁能敌。", source: "八连颂" },
  { text: "我们应当相信群众，我们应当相信党，这是两条根本的原理。", source: "关于农业合作化问题" },
  { text: "教育必须为无产阶级政治服务，必须与生产劳动相结合。", source: "关于教育工作的指示" },
  { text: "文明其精神，野蛮其体魄。", source: "体育之研究" },
  { text: "我们共产党人好比种子，人民好比土地。我们到了一个地方，就要同那里的人民结合起来，在人民中间生根、开花。", source: "关于重庆谈判" },
  { text: "谁敢横刀立马？唯我彭大将军！", source: "六言诗·给彭德怀同志" },
  { text: "风雨送春归，飞雪迎春到。", source: "卜算子·咏梅" },
  { text: "俏也不争春，只把春来报。", source: "卜算子·咏梅" },
  { text: "安得倚天抽宝剑，把汝裁为三截？一截遗欧，一截赠美，一截还东国。", source: "念奴娇·昆仑" },
  { text: "太平世界，环球同此凉热。", source: "念奴娇·昆仑" },
  { text: "孩儿立志出乡关，学不成名誓不还。", source: "七绝·改西乡隆盛诗赠父亲" },
  { text: "埋骨何须桑梓地，人生无处不青山。", source: "七绝·改西乡隆盛诗赠父亲" },
  { text: "指点江山，激扬文字，粪土当年万户侯。", source: "沁园春·长沙" },
  { text: "红军都是钢铁汉，千锤百炼不怕难。", source: "长征组歌" },
  { text: "一唱雄鸡天下白，万方乐奏有于阗。", source: "浣溪沙·和柳亚子先生" },
  { text: "不要吃老本，要立新功。", source: "在中共九届一中全会上的讲话" },
  { text: "为人民利益而死，就比泰山还重。", source: "为人民服务" },
  { text: "替法西斯卖力，替剥削人民和压迫人民的人去死，就比鸿毛还轻。", source: "为人民服务" },
  { text: "革命战争是群众的战争，只有动员群众才能进行战争，只有依靠群众才能进行战争。", source: "关心群众生活，注意工作方法" },
  { text: "我们有一条马克思列宁主义的政治路线和军事路线。", source: "目前形势和我们的任务" },
  { text: "夺取全国胜利，这只是万里长征走完了第一步。", source: "在中国共产党第七届中央委员会第二次全体会议上的报告" },
  { text: "兵民是胜利之本。", source: "论持久战" },
  { text: "战争的伟力之最深厚的根源，存在于民众之中。", source: "论持久战" },
  { text: "历史的经验值得注意。", source: "关于历史经验" }
];

const WallpaperApp = () => {
  const [timeStr, setTimeStr] = useState('');
  const [quoteIndex, setQuoteIndex] = useState(0);

  // 时钟更新逻辑 - 每秒更新
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setTimeStr(now.toLocaleString('zh-CN', options));
    };

    updateTime(); // 立即执行一次
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // 每日语录更新逻辑 - 根据日期生成种子
  useEffect(() => {
    const checkDateAndUpdateQuote = () => {
      const now = new Date();
      // 使用 年-月-日 字符串作为种子，确保全天不变
      const dateKey = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
      
      // 简单的哈希函数，将日期字符串转换为索引
      let hash = 0;
      for (let i = 0; i < dateKey.length; i++) {
        hash = (hash << 5) - hash + dateKey.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
      }
      
      // 取绝对值并对语录长度取模
      const index = Math.abs(hash) % QUOTES.length;
      
      setQuoteIndex(prevIndex => {
        if (prevIndex !== index) {
          return index;
        }
        return prevIndex;
      });
    };

    checkDateAndUpdateQuote();
    
    // 设置每分钟检查一次日期是否变更，确保跨日时能自动更新语录
    const timer = setInterval(checkDateAndUpdateQuote, 60000);
    return () => clearInterval(timer);
  }, []);

  const currentQuote = QUOTES[quoteIndex] || QUOTES[0];

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: '#DE2910', // 中国红
      color: '#FFDE00', // 五星黄
      fontFamily: '"Songti SC", "SimSun", "STSong", "AR PL New Sung", "Times New Roman", serif',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      position: 'relative',
      userSelect: 'none', // 像桌面壁纸一样不可选中文字
      cursor: 'default'
    }}>
      {/* 右上角时间戳 */}
      <div style={{
        position: 'absolute',
        top: '40px',
        right: '60px',
        fontSize: '4.5vh', // 增大字体
        color: '#FFFFFF', // 改为白色
        fontWeight: 'bold',
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
        letterSpacing: '1px'
      }}>
        {timeStr}
      </div>

      {/* 核心语录区域 */}
      <div style={{
        maxWidth: '80%',
        padding: '40px',
      }}>
        <h1 style={{
          fontSize: 'clamp(32px, 5vw, 72px)', // 响应式字体大小
          lineHeight: '1.6',
          fontWeight: 'bold',
          textIndent: '2em', // 第一行空两格
          textAlign: 'justify', // 两端对齐，最后一行自然居左
          margin: '0 0 40px 0',
          textShadow: '3px 3px 6px rgba(0,0,0,0.4)'
        }}>
          {currentQuote.text}
        </h1>

        {/* 出处标注 */}
        <div style={{
          fontSize: 'clamp(20px, 3vw, 36px)',
          textAlign: 'right', // 整体右对齐，符合语录排版习惯
          opacity: 0.95,
          marginTop: '20px',
          color: '#FFFFFF' // 改为白色
        }}>
          ——《{currentQuote.source}》
        </div>
      </div>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<WallpaperApp />);
