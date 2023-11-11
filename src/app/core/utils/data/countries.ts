export const COUNTRIES = [
  {id: 57, code: "CO", country: "Colombia", label: 'Colombia', value: 57}
]

export const DEPARTMENTS: DepartmentModel[] = [
  {id: 1, department: 'Bogota', id_country: 57, label: 'Bogota', value: 1},
  {id: 2, department: 'Antioquia', id_country: 57, label: 'Antioquia', value: 2},
  {id: 3, department: 'Atlantico', id_country: 57, label: 'Atlantico', value: 3}
]

export const CITIES: CityModel[] = [
  {id: 1, city: 'Bogota', id_department: 1, label: 'Bogota', value: 1},
  {id: 2, city: 'Medellin', id_department: 2, label: 'Medellin', value: 2},
  {id: 3, city: 'Barranquilla', id_department: 3, label: 'Barranquilla', value: 3}
]

export interface DepartmentModel {
  id: number,
  department: string,
  id_country: number,
  label: string,
  value: number
}

export interface CityModel {
  id: number,
  city: string,
  id_department: number,
  label: string,
  value: number
}
