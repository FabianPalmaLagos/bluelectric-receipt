// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

// Esta función se ejecuta cuando un usuario se registra
// Confirma automáticamente su email para evitar el proceso de verificación
// y también crea el perfil de usuario
Deno.serve(async (req) => {
  try {
    // Solo permitir solicitudes POST
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Método no permitido' }),
        { headers: { 'Content-Type': 'application/json' }, status: 405 }
      )
    }

    // Obtener el cuerpo de la solicitud
    const body = await req.json()
    
    // Verificar que sea un evento de registro de usuario
    if (body?.type !== 'auth.signup') {
      return new Response(
        JSON.stringify({ message: 'Evento ignorado, no es un registro' }),
        { headers: { 'Content-Type': 'application/json' }, status: 200 }
      )
    }

    // Obtener el ID del usuario del evento
    const userId = body?.record?.id
    if (!userId) {
      return new Response(
        JSON.stringify({ error: 'ID de usuario no encontrado en el evento' }),
        { headers: { 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Crear cliente de Supabase con la clave de servicio
    const supabaseAdmin = createClient(
      // Supabase API URL - env var exposed by default when deployed
      Deno.env.get('SUPABASE_URL') ?? '',
      // Supabase SERVICE ROLE KEY - env var exposed by default when deployed
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Confirmar el email del usuario
    const { error: confirmError } = await supabaseAdmin.auth.admin.updateUserById(
      userId,
      { email_confirm: true }
    )

    if (confirmError) {
      console.error('Error al confirmar email:', confirmError)
      return new Response(
        JSON.stringify({ error: 'Error al confirmar email' }),
        { headers: { 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    // Obtener datos del perfil del usuario desde los metadatos
    const userData = body?.record?.raw_user_meta_data;
    
    // Crear perfil del usuario en la tabla profiles
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .insert([
        {
          id: userId,
          first_name: userData?.first_name || '',
          last_name: userData?.last_name || '',
          role: userData?.role || 'worker',
        },
      ]);

    if (profileError) {
      console.error('Error al crear perfil:', profileError);
      return new Response(
        JSON.stringify({ error: 'Error al crear perfil: ' + profileError.message }),
        { headers: { 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    // Respuesta exitosa
    return new Response(
      JSON.stringify({ message: 'Email confirmado y perfil creado automáticamente' }),
      { headers: { 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (error) {
    // Manejar errores
    console.error('Error en la función:', error)
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor: ' + error.message }),
      { headers: { 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/auto-confirm-email' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
