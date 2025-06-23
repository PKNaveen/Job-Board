import {addContactsValidation} from "@/lib/validation";
import {insetIntoAllContactsTable} from "@/lib/actions/insertActions";
import {updateAllContacts} from "@/lib/actions/updateActions";

export const ContactsForm = async (user_id:string, prevState:any, formData:FormData, action:string, contacts_id:string) =>{
    const formValues={
        name:formData.get("name") as string,
        company:formData.get("company") as string,
        title:formData.get("title") as string,
        email:formData.get("email") as string,
        phone:formData.get("phone") as string,
        linkedin:formData.get("linkedin") as string,
        twitter:formData.get("twitter") as string,
    }

    await addContactsValidation.parseAsync({
        name: formValues.name,
        company: formValues.company,
        title:formValues.title,
        email:formValues.email,
        number:formValues.phone,
        linkedin:formValues.linkedin,
        twitter:formValues.twitter,
    })

    // Reuse this using switch case here itself
    // like switch (action)
    //  case 1 insert
    // cse 2 update
    //  case 3 delete
    switch (action) {
            case "insert":
                return await insetIntoAllContactsTable(user_id, formValues.name, formValues.company, formValues.title, formValues.email, formValues.phone, formValues.linkedin, formValues.twitter)

            case "update":
                return await updateAllContacts (contacts_id, formValues.name, formValues.company, formValues.title, formValues.email, formValues.phone, formValues.linkedin, formValues.twitter)
    }
}
