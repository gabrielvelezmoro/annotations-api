import { container } from 'tsyringe'
import { LocalStorageProvider } from './implementations/local-storage-provider'
import { S3StorageProvider } from './implementations/s3-storage-provider'
import { IStorageProvider } from './i-storage-provider'

const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
}

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  diskStorage[process.env.disk]
)
