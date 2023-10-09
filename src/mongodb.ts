import mongoose from 'mongoose';

const main = async () => {
    await mongoose.connect('mongodb+srv://romancox:romancox@mytodolistscluster.ukqwuid.mongodb.net/TodolistsApp?retryWrites=true&w=majority');
}
main().then(() => {
    console.log('We are connect!')
})
main().catch(err => console.log(err));