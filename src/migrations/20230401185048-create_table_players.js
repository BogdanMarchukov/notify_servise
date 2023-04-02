'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        'players',
        {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
          },
          first_name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          createdAt: {
            type: Sequelize.DATE,
          },
          updatedAt: {
            type: Sequelize.DATE,
          },
        },
        { transaction },
      );
      const randomStringList = [
        'q',
        'w',
        'r',
        'd',
        'g',
        'h',
        'j',
        'p',
        'c',
        'm',
        'g',
        'h',
        'j',
        'p',
        'c',
        'm',
      ];
      const fakeFirstNames = [];
      let name = '';
      Array(1000)
        .fill(0)
        .forEach((_) => {
          if (name.length === 5) {
            fakeFirstNames.push(name);
            name = '';
          } else {
            name += randomStringList[Math.round(Math.random() * 10)] ?? 'g';
          }
        });
      function randomDate(start, end) {
        return new Date(
          start.getTime() + Math.random() * (end.getTime() - start.getTime()),
        );
      }

      const playersData = [];
      let nameIndex = 0;
      for (let i = 0; i < 100000; i++) {
        if (!fakeFirstNames[nameIndex]) {
          nameIndex = 0;
        }
        const date = randomDate(new Date(2020, 0, 1), new Date());
        playersData.push({
          id: i,
          first_name: fakeFirstNames[nameIndex],
          createdAt: date,
          updatedAt: date,
        });
        nameIndex++;
      }
      await queryInterface.bulkInsert('players', playersData, { transaction });
      await queryInterface.addIndex('players', ['first_name'], { transaction });
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('players', ['first_name']);
    await queryInterface.dropAllTables();
  },
};
