import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import {AppError} from '../shared/errors/app-error'

export class AxiosRequest {
    public async execute(config: AxiosRequestConfig): Promise<AxiosResponse<any>> {
        try {
            const response = await Axios(config);
            return response
        } catch (error) {
            throw new AppError(error.response.data, error.response.status)
        }

    }
}
