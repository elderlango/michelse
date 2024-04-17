const Device = require('../model/device.model.js'); 

const addDevice = async (req, res) => {
    const { adminUser, room, monitoredUsers, sensors, graphicScreenMessages } = req.body;

    try {
        // Crear el nuevo dispositivo con datos detallados para cada sensor, incluido el nuevo sensor de humedad
        const newDevice = new Device({
            adminUser,
            room,
            monitoredUsers,
            sensors: {
                gasDetector: sensors.gasDetector,
                ultrasonic: sensors.ultrasonic,
                temperature: sensors.temperature,
                humidity: sensors.humidity // Asegúrate de que la propiedad 'humidity' se pase en la solicitud
            },
            graphicScreenMessages,
        });

        // Guarda el nuevo dispositivo en la base de datos
        const savedDevice = await newDevice.save();
        // Envía la respuesta con el dispositivo guardado, excluyendo datos sensibles si es necesario
        res.status(201).json({
            message: "Dispositivo agregado con éxito",
            device: savedDevice
        });
    } catch (error) {
        // Registra el error en el servidor y envía un mensaje de error
        console.error(error);
        res.status(500).send('Error al agregar el dispositivo: ' + error.message);
    }
};


const getDevices = async (req, res) => {
    try {
        const devices = await Device.find({}).populate('adminUser');
        res.send(devices);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los dispositivos');
    }
};

const updateDevice = async (req, res) => {
    try {
        const deviceId = req.params.id;
        const deviceData = req.body;

        const updatedDevice = await Device.findByIdAndUpdate(deviceId, deviceData, { new: true });
        if (!updatedDevice) {
            return res.status(404).send('Device not found');
        }

        res.json({ message: 'Device updated successfully', device: updatedDevice });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el dispositivo');
    }
};

const deleteDevice = async (req, res) => {
    try {
        const deviceId = req.params.id;
        const deletedDevice = await Device.findByIdAndDelete(deviceId);

        if (!deletedDevice) {
            return res.status(404).send('Device not found');
        }

        res.json({ message: 'Device deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar el dispositivo');
    }
};

const getDeviceById = async (req, res) => {
    try {
        const deviceId = req.params.id;
        const device = await Device.findById(deviceId).populate('adminUser');

        if (!device) {
            return res.status(404).send('Device not found');
        }

        res.json(device);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el dispositivo');
    }
};

//---------------------------------------------------------------------------------------------------------------------Devices

const getDevicesByAdmin = async (req, res) => {
    if (!req.admin) {
        return res.status(401).json({ message: 'No autorizado' });
      }
      const { _id: adminId } = req.admin; // Utiliza el ID del objeto admin adjuntado por el middleware

    try {
        const devices = await Device.find({ adminUser: adminId });
        if (devices.length === 0) {
            // Si no se encuentran dispositivos, se podría considerar responder con un 404 o un 200 con un mensaje específico.
            return res.status(404).json({ message: 'No se encontraron dispositivos para este administrador.' });
        }
        res.status(200).json(devices);
    } catch (error) {
        // Manejo de errores específicos de la base de datos
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'ID de administrador inválido.', error: error.message });
        }
        
        // Otro tipo de errores de Mongoose/ MongoDB
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Error de validación.', error: error.message });
        }

        // Error de conexión a la base de datos
        if (error.name === 'MongoNetworkError') {
            return res.status(503).json({ message: 'Problema de conexión con la base de datos.', error: error.message });
        }

        // Manejo de otros errores no capturados específicamente
        console.error(`Error al obtener dispositivos: ${error.message}`);
        res.status(500).json({ message: 'Error interno del servidor al obtener dispositivos.', error: error.message });
    }
};


const saveSensorData = async (req, res) => {
    const { deviceId, sensorType } = req.params;
    const { data } = req.body; // data contiene los campos específicos para cada tipo de sensor

    try {
        // Construye la ruta de actualización basada en el tipo de sensor
        const updatePath = `sensors.${sensorType}.data`;
        const updatedDevice = await Device.findByIdAndUpdate(
            deviceId,
            { $push: { [updatePath]: data } },
            { new: true }
        );

        if (!updatedDevice) {
            return res.status(404).send('Device not found');
        }
        res.json({ message: 'Sensor data updated successfully', device: updatedDevice });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating sensor data');
    }
};



const getSensorData = async (req, res) => {
    const { deviceId, sensorType } = req.params;

    try {
        const device = await Device.findById(deviceId);
        if (!device) {
            return res.status(404).json({ message: 'Dispositivo no encontrado.' });
        }

        // Verifica si el tipo de sensor existe en el dispositivo
        if (!device.sensors[sensorType]) {
            return res.status(404).json({ message: `Tipo de sensor '${sensorType}' no encontrado en el dispositivo. `});
        }

        // Accede directamente a los datos del sensor específico
        const sensorData = device.sensors[sensorType].data;
        if (!sensorData || sensorData.length === 0) {
            return res.status(404).json({ message: `Datos para el sensor '${sensorType}' no encontrados. `});
        }

        res.json(sensorData);
    } catch (error) {
        // Manejo de errores específicos de Mongoose o de la base de datos
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'ID de dispositivo inválido.', error: error.message });
        }

        console.error(error);
        res.status(500).json({ message: 'Error al obtener los datos del sensor.', error: error.message });
    }
};


const saveGraphicScreenMessage = async (req, res) => {
    const { deviceId, message, messageType } = req.body;

    try {
        const device = await Device.findById(deviceId);
        if (!device) {
            return res.status(404).send('Device not found');
        }

        device.graphicScreenMessages.push({ message, messageType });
        await device.save();
        res.status(200).json({ message: 'Graphic screen message saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error saving graphic screen message');
    }
};

const loadGraphicScreenMessages = async (req, res) => {
    const { deviceId } = req.params;

    try {
        const device = await Device.findById(deviceId);
        if (!device) {
            return res.status(404).send('Device not found');
        }

        res.status(200).json(device.graphicScreenMessages);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error loading graphic screen messages');
    }
};

const saveSensorAlert = async (req, res) => {
    const { deviceId, sensorType } = req.params;
    const { alert } = req.body; // alert debe coincidir con la estructura de alertSchema

    try {
        const updatePath = `sensors.${sensorType}.alerts`;
        const updatedDevice = await Device.findByIdAndUpdate(
            deviceId,
            { $push: { [updatePath]: alert } },
            { new: true }
        );

        if (!updatedDevice) {
            return res.status(404).send('Device not found');
        }
        res.json({ message: 'Sensor alert saved successfully', device: updatedDevice });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error saving sensor alert');
    }
};


const getSensorAlerts = async (req, res) => {
    const { deviceId, sensorType } = req.params; // sensorType debe ser uno de 'gasDetector', 'ultrasonic', 'temperature'

    try {
        const device = await Device.findById(deviceId);
        if (!device) {
            return res.status(404).send('Device not found');
        }

        const sensorAlerts = device.sensors[sensorType].alerts;
        res.json(sensorAlerts);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error getting sensor alerts');
    }
};



module.exports = {
    addDevice,
    getDevices,
    updateDevice,
    deleteDevice,
    getDeviceById,
    getDevicesByAdmin,
    saveSensorData,
    getSensorData,
    saveGraphicScreenMessage,
    loadGraphicScreenMessages,
    saveSensorAlert,
    getSensorAlerts
    };