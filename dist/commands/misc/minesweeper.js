"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinesweeperCommand = void 0;
const framework_1 = require("@sapphire/framework");
const discord_js_1 = require("discord.js");
const emojis_json_1 = require("../../lib/emojis.json");
class MinesweeperCommand extends framework_1.Command {
    constructor(context, options) {
        super(context, {
            ...options,
            name: 'minesweeper',
            description: 'Play minesweeper',
            aliases: ['ms', 'Minesweeper']
        });
    }
    // & Slash command down below
    async registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) => {
            builder
                .setName('minesweeper')
                .setDescription('Play minesweeper')
                .addIntegerOption((option) => (option
                .setName('width')
                .setDescription('The width of the board')
                .setMinValue(5)
                .setMaxValue(11)
                .setRequired(true)))
                .addIntegerOption((option) => (option
                .setName('height')
                .setDescription('The height of the board')
                .setMinValue(5)
                .setMaxValue(11)
                .setRequired(true)))
                .addIntegerOption((option) => (option
                .setName('bombs')
                .setDescription('The number of bombs')
                .setMinValue(0)
                .setMaxValue(5)
                .setRequired(true)));
        });
    }
    async chatInputRun(interaction) {
        const board = this.generateBoard(interaction.options.getInteger('width', true), interaction.options.getInteger('height', true), interaction.options.getInteger('bombs', true));
        const embed = new discord_js_1.EmbedBuilder()
            .setColor('Green')
            .setTitle('Minesweeper!')
            .setDescription(this.formatBoard(board))
            .setTimestamp();
        return interaction.reply({ embeds: [embed] });
    }
    // & Message command down below
    async messageRun(message, args) {
        try {
            const width = await args.pick('integer');
            const height = await args.pick('integer');
            const bombCount = await args.pick('integer');
            const board = this.generateBoard(width, height, bombCount);
            const embed = new discord_js_1.EmbedBuilder()
                .setColor('Green')
                .setTitle('Minesweeper!')
                .setDescription(this.formatBoard(board))
                .setTimestamp();
            return message.channel.send({ embeds: [embed] });
        }
        catch (error) {
            message.reply(`## :cold_sweat: Invalid parameters!\nAll arguments must be an integer, **less than 11**. Otherwise the command will throw an error.\n-# ${emojis_json_1.emojis.info} Correct usage: Apple, minesweeper <width> <height> <bombsCount>`);
            message.channel.send(`### Error message:\n||${error}||`);
        }
    }
    generateBoard(width, height, bombCount) {
        const board = Array.from({ length: height }, () => Array(width).fill('||<:Gradientsun:1217935947530899547>||'));
        let placedBombs = 0;
        while (placedBombs < bombCount) {
            const x = Math.floor(Math.random() * width);
            const y = Math.floor(Math.random() * height);
            if (board[y][x] !== '||😰||') {
                board[y][x] = '||😰||';
                placedBombs++;
            }
        }
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                if (board[y][x] === '||😰||')
                    continue;
                const bombCount = this.countBombsAround(board, x, y);
                if (bombCount > 0) {
                    board[y][x] = '||<:gradienthalfmoon:1219018826662805564>||';
                }
            }
        }
        return board;
    }
    countBombsAround(board, x, y) {
        const deltas = [-1, 0, 1];
        let bombCount = 0;
        deltas.forEach(dx => {
            deltas.forEach(dy => {
                if (dx === 0 && dy === 0)
                    return;
                const newX = x + dx;
                const newY = y + dy;
                if (newY >= 0 && newY < board.length && newX >= 0 && newX < board[0].length) {
                    if (board[newY][newX] === '||😰||')
                        bombCount++;
                }
            });
        });
        return bombCount;
    }
    formatBoard(board) {
        return board.map(row => row.join(' ')).join('\n');
    }
}
exports.MinesweeperCommand = MinesweeperCommand;