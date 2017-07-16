var course = {
    title: {
        en:'Tomorrow',
        cn:'明日复明日',
        sound:'01.mp3'
    },
    characters: [
        {name: 'Monkey', color:'#009900', cn:'小猴子'},
        {name: 'Rabbit ', color:'#0099cc', cn:'小白兔'},
        {name: 'Elephant', color:'#ff6633', cn:'大象'},
        {name: 'Narrator', color:'#996600', cn:'旁白'},
    ],
    summary: {
        en: 'This play tells the story of a monkey who lives in a tree and loves to play. One day he asks his friend Rabbit to play with him, but she says no. Then it starts to rain, and Rabbit takes shelter in her burrow beneath the tree. She invites monkey to shelter there with him, but Monkey says the burrow is too small. Instead he stays in the tree and gets wet. But he decides to build a house for himself.\n' +
            ' The next day, Monkey’s friend Elephant tells him to begin work on the house, but it is Sunday and Monkey doesn’t start. On Monday, Monkey finds a swing to play on instead of working. The day after that, he picks peaches. Monkey’s friends get more and more frustrated with him.\n' +
            ' Finally, Monkey starts work but then it starts to rain, and he has no house to shelter in!',
        cn: '本剧讲述了一只住在树上整天玩耍的小猴子的故事。一天他邀请好朋友小白兔和他一起玩，但小白兔拒绝了。这时天突然开始下雨了，小白兔钻进了树下的树洞里去避雨。她邀请小猴子进来和她一块儿避雨，但小猴子却说这个树洞太小了，因此他就一直待在树上，全身都被淋湿了。这时小猴子决定为自己建个房子。\n' +
            '第二天，小猴子的朋友大象告诉他可以开始动工了，但由于这天是星期天，小猴子不愿意开工。到了星期一小猴子在秋千上玩了一整天又没有动工。又过了一天，小猴子去摘桃子了，就这样吃了一整天。小猴子的朋友们对他也感到越来越失望。\n' +
            '最后，当小猴子开始准备造房子时，天却开始下雨了。小猴子也始终没有自己的房子能让他避雨。',
        sound: '03.mp3'
    },
    content: {
        pages: [{
            id: 'page_1',
            title: {en:'Act1', cn:'第一幕'},
            sound: 's0.mp3',
            dialog:[
                {
                    id: 1,
                    character: 'Narrator',
                    text_en: 'This is the story of a silly monkey who only likes to play.\n' +
                    'MONKEY sits on a tree branch, and talks to the audience',
                    text_cn: '这是关于一只既愚笨又爱玩的小猴子的故事。\n' +
                    '（小猴子坐在树枝上，对观众说道。）',
                    sound: '04.mp3'
                },
                {
                    id: 2,
                    character: 'Monkey',
                    text_en: 'I am Monkey. I live in a tree.\n' +
                    'It’s the perfect home for me.\n' +
                    'Up and down, I climb and play\n' +
                    'I swing from branch to branch all day\n',
                    text_cn: '我是小猴子，我住在树上。\n' +
                    '这是我美好的家。\n' +
                    '我总是爬上爬下地玩耍。\n' +
                    '整天在树枝间荡来荡去。',
                    sound: '05.mp3'
                },
                {
                    id: 3,
                    character: 'Rabbit',
                    text_en: 'Hello, Monkey, in your tree',
                    text_cn: '你好，小猴子，在树上呢',
                    sound: '06.mp3'
                },
                {
                    id: 4,
                    character: 'Monkey',
                    text_en: 'Rabbit! Will you play with me? ',
                    text_cn: '小白兔，你愿意陪我玩吗？',
                    sound: '07.mp3'
                },
                {
                    id: 5,
                    character: 'Rabbit',
                    text_en: 'No, my friend, I am too busy.\n' +
                    'Climbing trees makes me feel dizzy!',
                    text_cn: '不，我的朋友，我太忙了。\n' +
                    '爬树会让我感到头晕！',
                    sound: '08.mp3'
                },
                {
                    id: 6,
                    character: 'Monkey',
                    text_en: 'Come on, Rabbit, have some fun.\n' +
                    'Climbing’s good for everyone!',
                    text_cn: '快来吧，小兔子，一起玩吧。' +
                    '爬树有益健康！',
                    sound: '09.mp3'
                },
                {
                    id: 7,
                    character: 'Rabbit',
                    text_en: 'Wait! Do I feel rain? Oh dear!\n' +
                    'Soon it’s going to rain, I fear',
                    text_cn: '等等！我淋到雨了吗？我的天呐！\n' +
                    '恐怕很快就要下雨了。',
                    sound: '10.mp3'
                },
                {
                    id: 8,
                    character: 'Monkey',
                    text_en: 'Yes, I felt a few more drops.',
                    text_cn: '是的，我也淋到雨滴了。',
                    sound: '11.mp3'
                },
                {
                    id: 9,
                    character: 'Rabbit',
                    text_en: 'Let’s take shelter till it stops.\n' +
                    'My burrow is the place to be.\n' +
                    'Come inside and wait with me.\n',
                    text_cn: '让我们去避避雨等雨停吧。' +
                    '这是我待的树洞\n' +
                    '快进来和我一起等雨停吧',
                    sound: '12.mp3'
                },
                {
                    id: 10,
                    character: 'Monkey',
                    text_en: 'Now the rain is pouring down! ',
                    text_cn: '现在大雨倾盆而下！',
                    sound: '13.mp3'
                },
                {
                    id: 11,
                    character: 'Rabbit',
                    text_en: 'Don’t stay out there, or you’ll drown!\n' +
                    'Monkey, come in from the storm\n' +
                    'Inside, you’ll be dry and warm',
                    text_cn: '不要待在外面，否则你会被雨水淹没的！\n' +
                    '小猴子，快进来躲躲暴雨\n' +
                    '里面既干燥又暖和',
                    sound: '14.mp3'
                },
                {
                    id: 15,
                    character: 'Monkey',
                    text_en: 'Thank you, my dear friend, but no \n' +
                    'Soon enough the rain will go \n' +
                    'I don’t like getting wet at all, \n' +
                    'But Rabbit’s house is very small \n' +
                    'A house! Yes, that’s a good idea \n' +
                    'I will build a house up here! \n' +
                    'A great, big treehouse way up high \n' +
                    'I’ll be warm and I’ll be dry \n' +
                    'Better than that little burrow \n' +
                    'I’ll start building it … tomorrow! ',
                    text_cn: '谢谢你，我亲爱的朋友，但是不了\n' +
                    '雨很快就会停\n' +
                    '虽然我一点都不喜欢被淋湿\n' +
                    '但是你的房子实在太小了\n' +
                    '房子！是的，那是一个好主意\n' +
                    '我会在这上面建一个自己的房子\n' +
                    '又好又大，高高挂在树上的房子\n' +
                    '在里面既温暖又干燥\n' +
                    '比那个小树洞强多了\n' +
                    '我马上动工……就从明天开始！',
                    sound: '15.mp3'
                },
            ]
        },
        ],

    }
}