require('dotenv').config();
const { Pool } = require('pg');
const yargs = require('yargs');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const runQuery = async (text, params, action) => {
  const client = await pool.connect();
  try {
    const res = await client.query({ text, values: params });
    console.log(`${action}:`, res.rows.length ? res.rows : 'No results found');
  } catch (err) {
    console.error(`Error during ${action}:`, err.stack);
  } finally {
    client.release();
  }
};

const commands = {
  add: async ({ nombre, rut, curso, nivel }) => {
    const text = 'INSERT INTO estudiantes(nombre, rut, curso, nivel) VALUES($1, $2, $3, $4) RETURNING *';
    const params = [nombre, rut, curso, nivel];
    await runQuery(text, params, 'Estudiante agregado');
  },
  get: async ({ rut }) => {
    const text = 'SELECT * FROM estudiantes WHERE rut = $1';
    const params = [rut];
    await runQuery(text, params, 'Estudiante');
  },
  getAll: async () => {
    const text = 'SELECT * FROM estudiantes';
    await runQuery(text, [], 'Estudiantes');
  },
  update: async ({ nombre, rut, curso, nivel }) => {
    const text = 'UPDATE estudiantes SET nombre = $1, curso = $2, nivel = $3 WHERE rut = $4 RETURNING *';
    const params = [nombre, curso, nivel, rut];
    await runQuery(text, params, 'Estudiante actualizado');
  },
  delete: async ({ rut }) => {
    const text = 'DELETE FROM estudiantes WHERE rut = $1 RETURNING *';
    const params = [rut];
    await runQuery(text, params, 'Estudiante eliminado');
  }
};

const argv = yargs
  .command('add', 'Agregar un nuevo estudiante', {
    nombre: { describe: 'Nombre del estudiante', demand: true, alias: 'n' },
    rut: { describe: 'RUT del estudiante', demand: true, alias: 'r' },
    curso: { describe: 'Curso del estudiante', demand: true, alias: 'c' },
    nivel: { describe: 'Nivel del estudiante', demand: true, alias: 'l' }
  })
  .command('get', 'Obtener un estudiante por RUT', {
    rut: { describe: 'RUT del estudiante', demand: true, alias: 'r' }
  })
  .command('getAll', 'Obtener todos los estudiantes')
  .command('update', 'Actualizar datos de un estudiante', {
    nombre: { describe: 'Nombre del estudiante', alias: 'n' },
    rut: { describe: 'RUT del estudiante', demand: true, alias: 'r' },
    curso: { describe: 'Curso del estudiante', alias: 'c' },
    nivel: { describe: 'Nivel del estudiante', alias: 'l' }
  })
  .command('delete', 'Eliminar un estudiante', {
    rut: { describe: 'RUT del estudiante', demand: true, alias: 'r' }
  })
  .help()
  .argv;

const command = argv._[0];
if (commands[command]) {
  commands[command](argv);
}
