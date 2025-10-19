import { Client, GatewayIntentBits, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } from 'discord.js';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers
  ]
});

client.once('ready', async () => {
  console.log(`✅ Bot is ready! Logged in as ${client.user.tag}`);
  
  const command = {
    name: 'send_to_all',
    description: 'إرسال رسالة لجميع أعضاء السيرفر'
  };

  try {
    const guilds = client.guilds.cache;
    for (const guild of guilds.values()) {
      await guild.commands.create(command);
      console.log(`✅ Slash command registered in guild: ${guild.name}`);
    }
  } catch (error) {
    console.error('Error registering slash command:', error);
  }
});

client.on('interactionCreate', async interaction => {
  if (interaction.isCommand() && interaction.commandName === 'send_to_all') {
    const modal = new ModalBuilder()
      .setCustomId('send_to_all_modal')
      .setTitle('إرسال رسالة لجميع الأعضاء');

    const reasonInput = new TextInputBuilder()
      .setCustomId('reason')
      .setLabel('السبب / الرسالة')
      .setStyle(TextInputStyle.Paragraph)
      .setPlaceholder('اكتب الرسالة هنا...')
      .setRequired(true);

    const actionRow = new ActionRowBuilder().addComponents(reasonInput);
    modal.addComponents(actionRow);

    await interaction.showModal(modal);
  }

  if (interaction.isModalSubmit() && interaction.customId === 'send_to_all_modal') {
    const reason = interaction.fields.getTextInputValue('reason');
    
    await interaction.reply({ 
      content: '⏳ جاري إرسال الرسائل...', 
      ephemeral: true 
    });

    const guild = interaction.guild;
    await guild.members.fetch();
    
    const members = guild.members.cache.filter(member => !member.user.bot);
    
    let successCount = 0;
    let failCount = 0;

    for (const [, member] of members) {
      try {
        const message = `${reason}\n<@${member.user.id}>`;
        await member.send(message);
        successCount++;
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`فشل إرسال رسالة إلى ${member.user.tag}:`, error.message);
        failCount++;
      }
    }

    await interaction.editReply({ 
      content: `✅ تم إرسال الرسالة!\n📤 نجح: ${successCount}\n❌ فشل: ${failCount}`,
      ephemeral: true 
    });
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
