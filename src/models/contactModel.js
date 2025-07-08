import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,  // унікальний ідентифікатор (UUID)
    },
    name: {
      type: String,
      required: true,
    },
    phone: {          // поле "phone" як у JSON
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    job: {            // поле "job" додано відповідно до JSON
      type: String,
    },
  },
  {
    timestamps: true,  // автоматичні поля createdAt та updatedAt
  }
);

export const Contact = mongoose.model('Contact', contactSchema);