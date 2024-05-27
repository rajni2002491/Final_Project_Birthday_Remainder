import React, { useState, useEffect, useContext, useRef } from 'react';
import { Formik } from 'formik';
import formService from './../../services/formService';
import FormComponent from './FormComponent';
import { GlobalContext } from '../../contexts/GlobalContext';
import { AuthContext } from '../../contexts/AuthContext';
import { useHistory } from 'react-router';
import { capitalize } from '../../helpers.js';
import { db } from '../../firebase/firebase.js';
import { v4 } from 'uuid';

function AddForm() {
	const { addPerson } = useContext(GlobalContext);
	const { currentUser } = useContext(AuthContext);

	const [addingBirthday, setAddingBirthday] = useState(false);
	const [error, setError] = useState(null);

	const history = useHistory();
	const formRef = useRef();
	const nameInputRef = useRef(null);

	useEffect(() => {
		nameInputRef.current.focus();
	}, []);

	async function handleSubmit() {
		try {
			setError(null);
			setAddingBirthday(true);
			// checking for internet connection; firestore doesn't throw error when there is no internet connection
			if (!window.navigator.onLine)
				throw new Error('Failed to submit due to a connection error. Please try again later.');

			const person = {
				// generate new id when adding a new person; use the existing id if editing the person
				id: v4(),
				userId: currentUser.uid,
				name: capitalize(formRef.current.values.name.trim()),
				month: capitalize(formRef.current.values.month.trim()),
				date: formRef.current.values.date,
				year: formRef.current.values.year,
			};

			// updating local state; adding the new person to the people list
			addPerson(person);
			// updating persons collection in the database
			// creating a new person doc for the new person
			// need to do it like this instead of .add() because I want to give each doc a custom id (not the one generated by firebase)
			await db.collection('persons').doc(person.id).set(person);

			setAddingBirthday(false);
			formRef.current.resetForm();
			history.push('/all-birthdays');
		} catch (error) {
			console.log(error);
			setAddingBirthday(false);
			setError(error.message);
		}
	}

	return (
		<Formik
			initialValues={{
				name: '',
				month: '',
				date: '',
				year: '',
			}}
			validationSchema={formService.schema}
			onSubmit={handleSubmit}
			innerRef={formRef}
			validateOnBlur={false}
			validateOnChange={false}
		>
			{(formik) => {
				return (
					<FormComponent
						form={formService.addForm}
						formik={formik}
						isSubmitting={addingBirthday}
						error={error}
						inputRef={nameInputRef}
					/>
				);
			}}
		</Formik>
	);
}

export default AddForm;