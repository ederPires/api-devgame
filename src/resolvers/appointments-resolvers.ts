import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { CreateAppointmentInput } from '../dtos/inputs/create-appointment-inputs';
import { Appointment } from '../dtos/models/appointment-model';
import { Customer } from '../dtos/models/customer-model';

@Resolver(() => Appointment)
export class AppointmentsResolver {
  @Query(() => String)
  async helloWorld() {
    return 'Hello World';
  }

  @Query(() => [Appointment]) // Alteração aqui para retornar um array de Appointments
  async appointments(): Promise<Appointment[]> {
    // Simula a busca de appointments no banco de dados
    // Aqui você pode realizar uma consulta ao banco de dados para buscar os appointments existentes
    // Por exemplo:
    // const appointmentsFromDB = await AppointmentModel.find();

    // Neste exemplo, vamos retornar um array vazio se não houver appointments
    return [
      {
        startsAt: new Date(),
        endsAt: new Date(),
      }
    ]; // Retorne um array vazio ou os appointments reais do banco de dados
  }

  @Mutation(() => Appointment)
  async CreateAppointment(@Arg('data') data: CreateAppointmentInput): Promise<Appointment> {
    // Simula a criação de um objeto Appointment com os dados fornecidos
    const appointment: Appointment = {
      startsAt: data.startsAt,
      endsAt: data.endsAt,
      // Aqui você pode adicionar outras propriedades do objeto Appointment, se houver
    };

    // Aqui seria o lugar para a lógica real de criação do appointment no banco de dados, por exemplo

    return appointment;
  }

  @FieldResolver(() => Customer)
  async customer(@Root() appointment: Appointment) { //Root busca o pai do relacionamento
    console.log(appointment);
    return {
      name: 'John Doe',
    }
  }
}
