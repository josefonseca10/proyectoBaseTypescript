import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'APA_EMPLEADO' })
export class ApaEmployeeEntity {
  @PrimaryColumn({ name: 'ROL', type: 'number', nullable: false })
  role: string = '';

  @Column({ name: 'P_APELLIDO', type: 'varchar' })
  firstLastName: string = '';

  @Column({ name: 'S_APELLIDO', type: 'varchar' })
  secondLastName: string = '';

  @Column({ name: 'NOMBRES', type: 'varchar' })
  names: string = '';

  @Column({ name: 'CEDULA', type: 'varchar' })
  identificate: string = '';

  @Column({ name: 'LIB_MILITAR', type: 'varchar' })
  militaryCard: string = '';

  @Column({ name: 'NUMERO_IESS', type: 'varchar' })
  numberIess: string = '';

  @Column({ name: 'NUM_TARJETA', type: 'number' })
  numberCard: string = '';

  @Column({ name: 'SEXO', type: 'varchar' })
  gender: string = '';

  @Column({ name: 'CONDICION', type: 'varchar' })
  condition: string = '';

  @Column({ name: 'FEC_INGRESO', type: 'date', nullable: true })
  admissionDate!: Date;

  @Column({ name: 'FEC_SERVICO', type: 'date' })
  serviceDate!: Date;

  @Column({ name: 'FEC_NACIMIE', type: 'date' })
  birthDate!: Date;

  @Column({ name: 'FEC_ONOMAST', type: 'date' })
  onomastDate!: Date;

  @Column({ name: 'FEC_SALIDA', type: 'date' })
  departureDate!: Date;

  @Column({ name: 'NUM_DEPEND', type: 'number' })
  numberDependents!: number;

  @Column({ name: 'DIRECCION', type: 'varchar' })
  address: string = '';

  @Column({ name: 'TELEFONO', type: 'varchar' })
  phone: string = '';

  @Column({ name: 'TELEFONO_E', type: 'varchar' })
  phoneE: string = '';

  @Column({ name: 'ESTAD_CIVIL', type: 'varchar' })
  civilStatus: string = '';

  @Column({ name: 'HORAS_SOBRE', type: 'number' })
  hoursSobre!: number;

  @Column({ name: 'INSTRUCCION', type: 'varchar' })
  instruccion: string = '';

  @Column({ name: 'CEN_COSTO', type: 'varchar' })
  costCenter: string = '';

  @Column({ name: 'TIPO_PART', type: 'varchar' })
  budgetType: string = '';

  @Column({ name: 'NUM_PART', type: 'varchar' })
  numberBudget: string = '';

  @Column({ name: 'CLAS_PUESTO', type: 'varchar' })
  jobClass: string = '';

  @Column({ name: 'LUG_TRABAJO', type: 'varchar' })
  placeWork: string = '';

  @Column({ name: 'HISTORIA', type: 'varchar' })
  history: string = '';

  @Column({ name: 'HORARIO', type: 'varchar' })
  schedule: string = '';

  @Column({ name: 'PRO_DOMICIL', type: 'varchar' })
  provinceAddress: string = '';

  @Column({ name: 'CAN_DOMICIL', type: 'varchar' })
  cantonAddress: string = '';

  @Column({ name: 'PAR_DOMICIL', type: 'varchar' })
  parishAddress: string = '';

  @Column({ name: 'PRO_NACIMTO', type: 'varchar' })
  provinceBirth: string = '';

  @Column({ name: 'HABILITADO', type: 'varchar' })
  enable: string = '';

  @Column({ name: 'BANCO', type: 'varchar' })
  bank: string = '';

  @Column({ name: 'CUENTA_CTE', type: 'varchar' })
  accountBank: string = '';

  @Column({ name: 'NUM_SANCIONES', type: 'number', nullable: true })
  numberSanctions: number = 0;

  @Column({ name: 'ANO_INSTRUCCION', type: 'number' })
  yearInstruction: number = 0;

  @Column({ name: 'FEC_REINGRESO', type: 'date', nullable: true })
  reAdmissionDate = new Date();

  @Column({ name: 'TRANSPORTE', type: 'varchar' })
  transport: string = '';

  @Column({ name: 'TIPO_CUENTA', type: 'varchar' })
  accountType: string = '';

  @Column({ name: 'FEC_RECTSE', type: 'date' })
  rectseDate = new Date();

  @Column({ name: 'ASOCIACION', type: 'varchar' })
  association: string = '';

  @Column({ name: 'FEC_RECLAS', type: 'date' })
  reClassDate = new Date();

  @Column({ name: 'COASEGURA', type: 'varchar' })
  coSegura: string = '';

  @Column({ name: 'CALL_DOMI', type: 'varchar' })
  streetHome: string = '';

  @Column({ name: 'NUME_DOMI', type: 'varchar' })
  numberHome: string = '';

  @Column({ name: 'INTE_DOMI', type: 'varchar' })
  intersectionHome: string = '';

  @Column({ name: 'E_MAIL', type: 'varchar' })
  mail: string = '';

  @Column({ name: 'EXTE_TELE', type: 'varchar' })
  ext: string = '';

  @Column({ name: 'TELE_CELU', type: 'varchar' })
  mobil: string = '';

  @Column({ name: 'CONDUCCION', type: 'varchar' })
  driving: string = '';

  @Column({ name: 'TIPO_LICENCIA', type: 'varchar' })
  typeLicense: string = '';

  @Column({ name: 'SECTOR', type: 'varchar' })
  sector: string = '';

  @Column({ name: 'CODI_POSTAL', type: 'number' })
  codeZip: number = 0;

  @Column({ name: 'EMAIL_PERSONAL', type: 'varchar' })
  mailPersonal: string = '';

  @Column({ name: 'ETNIA', type: 'varchar' })
  ethnicity: string = '';

  @Column({ name: 'CONTACTO', type: 'varchar' })
  contact: string = '';

  @Column({ name: 'P_APELL_CONTACTO', type: 'varchar' })
  firstLastNameContact: string = '';

  @Column({ name: 'S_APELL_CONTACTO', type: 'varchar' })
  secondLastNameContact: string = '';

  @Column({ name: 'NOMB_CONTACTO', type: 'varchar' })
  namesContact: string = '';

  @Column({ name: 'FECH_SALI_BACK', type: 'date' })
  backDepartureDate = new Date();
}
